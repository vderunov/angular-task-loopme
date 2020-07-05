import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanDeactivate,
  CanLoad,
  Route,
  Router, RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

import { Observable } from 'rxjs';
import {
  filter, map, take, tap,
} from 'rxjs/operators';
import { NotificationsService, NotificationTypes, takeUntilDestroy } from '@loopme/uikit';
import { select, Store } from '@ngrx/store';
import { IAppState } from './store/state/app.state';
import { GetCoinById } from './store/actions/additional-info.actions';
import { selectCoinById, selectCoinByIdFailure } from './store/selectors/additional-info.selector';

@Injectable({ providedIn: 'root' })
export class IdGuard implements CanLoad,
  CanActivate,
  CanDeactivate<boolean>,
  OnDestroy {
  constructor(
    private router: Router,
    private notificationsService: NotificationsService,
    private store: Store<IAppState>,
  ) {
    this.store.pipe(
      select(selectCoinByIdFailure),
      tap((error) => {
        if (error) {
          this.notificationsService.create(NotificationTypes.WARNING, 'Coin not found');
          this.router.navigate(['']);
        }
      }),
      takeUntilDestroy(this),
    ).subscribe();
  }

  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this.doProtect(+segments[1].path);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.doProtect(+route.params.id);
  }

  public canDeactivate(): Observable<boolean> | boolean {
    return true;
  }

  public doProtect(id: number): Observable<boolean> {
    this.store.dispatch(new GetCoinById(id));

    return this.store.pipe(
      select(selectCoinById),
      filter((result) => !!result),
      take(1),
      map(() => true),
    );
  }

  public ngOnDestroy(): void { }
}
