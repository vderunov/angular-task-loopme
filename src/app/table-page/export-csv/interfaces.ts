export interface IExportCsvComponent {
  dataPrimitives: IDataPrimitives[];

  exportToCsv(): void;
}

export interface IDataPrimitives {
  change: number;
  description: string;
  id: number;
  name: {
    name: string;
  };
  numberOfExchanges: number;
  numberOfMarkets: number;
  price: number;
  slug: string;
  symbol: string;
}
