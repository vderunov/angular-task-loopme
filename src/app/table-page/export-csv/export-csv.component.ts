import { Component, Input } from '@angular/core';

import { ExportToCsv } from 'export-to-csv';
import { IDataPrimitives, IExportCsvComponent } from './interfaces';
import { ButtonStyleType } from '@loopme/uikit';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.scss']
})
export class ExportCsvComponent implements IExportCsvComponent {
  @Input() dataPrimitives: IDataPrimitives[];

  public ButtonStyleType = ButtonStyleType;
  public btnText = 'Export to csv';

  public exportToCsv(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'My cryptocurrency CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };

    const csvExporter = new ExportToCsv(options);
    const coins = this.dataPrimitives.map(coin => ({
      ...coin, name: coin.name.name
    }));

    csvExporter.generateCsv(coins);
  }
}
