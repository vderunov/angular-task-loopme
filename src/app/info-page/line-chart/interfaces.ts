export interface IHistory {
  price: string;
  timestamp: number;
}

export interface IHistoryObj {
  price: string;
  timestamp: number;
}

export interface IChartLineItem {
  price: string;
  date: string;
}

export interface IData {
  status: string;
  data: {
    change: number,
    history: IHistoryObj[]
  };
}


export interface ILineChartComponent {
  coin: any;
  history: IHistory[];
  isChartReady: boolean;
  currencyParam: string;
  timeFrameParam: string;
  editing: boolean;
  chartLineData: IChartLineItem[];
  activeLineMetrics: object[];

  fetchData(): void;

  createChartData(data): void;

  changeCurrHandler($event: any): void;

  changeTimePeriodHandler($event: any): void;
}


