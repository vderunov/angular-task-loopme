import { Component } from '@angular/core';

import { IUIKitNotificationsOptions } from '@loopme/uikit';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'angular-loopMe';
  public options: IUIKitNotificationsOptions = {
    timeOut: 5000,
    pauseOnHover: true,
    lastOnBottom: false,
  };
}
