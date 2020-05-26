import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, CanDeactivate,
  CanLoad,
  Route,
  Router, RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NotificationsService, NotificationTypes, takeUntilDestroy } from '@loopme/uikit';
import { CoinService } from './shared/coin.service';
import { CoinsALLProp } from './shared/interfaces';

@Injectable({ providedIn: 'root' })
export class IdGuard implements CanLoad,
  CanActivate,
  CanDeactivate<boolean>,
  OnDestroy {
  public coin: null | CoinsALLProp;

  constructor(
    private coinService: CoinService,
    private router: Router,
    private notificationsService: NotificationsService,
  ) {
    this.coinService.getCoinByIdSubject$()
      .pipe(
        tap((value) => {
          this.coin = value;
        }),
        takeUntilDestroy(this),
      )
      .subscribe();
  }

  public canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    if (this.coin) {
      return true;
    }
    return this.doProtect(+segments[1].path);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.coin) {
      return true;
    }
    return this.doProtect(+route.params.id);
  }

  public canDeactivate(): boolean {
    this.coinService.coinByIdSubject$.next(null);
    return true;
  }

  public doProtect(id: number): Observable<boolean> {
    return this.coinService.getById(id)
      .pipe(
        map((coin: CoinsALLProp) => {
          if (coin) {
            return true;
          }
          this.notificationsService.create(NotificationTypes.WARNING, `
               Coin not found`);
          this.router.navigate(['']);
          return false;
        }),
      );
  }

  public ngOnDestroy(): void { }
}
