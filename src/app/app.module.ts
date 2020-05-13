import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablePageModule } from './table-page/table-page.module';
import { SharedModule } from './shared/shared.module';
import { NotificationsService } from '@loopme/uikit';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TablePageModule
  ],
  providers: [NotificationsService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
