import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchBySymbolComponent } from './search/searchBySymbol.component';
import { FilterCurrencyComponent } from './filter-currency/filter-currency.component';
import { FilterTimePeriodComponent } from './filter-time-period/filter-time-period.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { TablePageComponent } from './table-page.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';


@NgModule({
  declarations: [
    TablePageComponent,
    PaginationComponent,
    SearchBySymbolComponent,
    FilterCurrencyComponent,
    FilterTimePeriodComponent,
    ErrorMessageComponent,
    ExportCsvComponent,
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: []
})

export class TablePageModule {

}
