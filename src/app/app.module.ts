import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NotificationsService } from '@loopme/uikit';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablePageModule } from './table-page/table-page.module';
import { SharedModule } from './shared/shared.module';
import { appReducers } from './store/reducers/app.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TableEffects } from './store/effects/table.effects';
import { environment } from '../environments/environment';
import { TableService } from './services/table.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TablePageModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([TableEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule,
  ],
  providers: [TableService, NotificationsService],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
