import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { CoinService } from './shared/coin.service';
import { map } from 'rxjs/operators';
import { NotificationsService, NotificationTypes } from '@loopme/uikit';

@Injectable({providedIn: 'root'})
export class IdGuard implements CanActivate {

  constructor(
    private coinService: CoinService,
    private router: Router,
    private notificationsService: NotificationsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const NOTIFICATION_DELAY = 1000;
    return this.coinService.getById(+route.params.id).pipe(
      map(value => {
        if (!!value) {
          return true;
        } else {
          setTimeout(() => {
            this.notificationsService.create(NotificationTypes.WARNING, `
               This id (№${+route.params.id}) doesn't exist`);
          }, NOTIFICATION_DELAY);
          this.router.navigate(['']);
        }
      }),
    );
  }
}
