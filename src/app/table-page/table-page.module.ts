import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '../shared/shared.module';
import { TablePageComponent } from './table-page.component';
import { ExportCsvComponent } from './export-csv/export-csv.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TablePageComponent,
    ExportCsvComponent
  ],
  imports: [
    SharedModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  exports: []
})

export class TablePageModule {

}
