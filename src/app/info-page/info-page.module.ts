import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InfoPageComponent } from './info-page.component';
import { CommonModule } from '@angular/common';
import { AdditionalCoinInfoComponent } from './additional-coin-info/additional-coin-info.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InfoPageComponent,
    AdditionalCoinInfoComponent,
    LineChartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: '', component: InfoPageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class InfoPageModule {

}

