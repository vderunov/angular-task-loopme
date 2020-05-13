import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { CoinService } from './shared/coin.service';
import { map } from 'rxjs/operators';
import { NotificationsService, NotificationTypes } from '@loopme/uikit';

@Injectable({providedIn: 'root'})
export class IdGuard implements CanActivate {

  constructor(private coinService: CoinService, private router: Router, private notificationsService: NotificationsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.coinService.getById(+route.params.id).pipe(
      map(value => {
        if (!!value) {
          return true;
        } else {
          setTimeout(() => {
            this.notificationsService.create(NotificationTypes.WARNING, `
               This id doesn't exist`);
          }, 1000);
          this.router.navigate(['']);
        }
      }),
    );
  }
}
