export interface IExportCsvComponent {
  dataPrimitives: any[];

  exportToCsv(): void;
}

export interface IDataPrimitives {
  change: number;
  description: string;
  id: number;
  name: string;
  numberOfExchanges: number;
  numberOfMarkets: number;
  price: number;
  slug: string;
  symbol: string;
}
