import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationsService, NotificationTypes } from '@loopme/uikit';
import { CoinService } from './shared/coin.service';
import { CoinsALLProp } from './shared/interfaces';

@Injectable({ providedIn: 'root' })
export class IdGuard implements CanActivate {
  constructor(
    private coinService: CoinService,
    private router: Router,
    private notificationsService: NotificationsService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.coinService.getById(+route.params.id)
      .pipe(
        map((coin: CoinsALLProp) => {
          if (coin) {
            return true;
          }
          this.notificationsService.create(NotificationTypes.WARNING, `
               Coin not found`);
          return this.router.parseUrl('');
        }),
      );
  }
}
