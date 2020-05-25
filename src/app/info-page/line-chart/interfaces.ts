import { CoinsALLProp } from '../../shared/interfaces';
import { EntryItem } from '@loopme/uikit';

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
    change: number;
    history: IHistoryObj[];
  };
}

export interface ILineChartComponent {
  coin: CoinsALLProp;
  history: IHistory[];
  isChartReady: boolean;
  currencyParam: string;
  timeFrameParam: string;
  editing: boolean;
  chartLineData: IChartLineItem[];
  activeLineMetrics: object[];
  selectedCurrency: EntryItem<number, string>[];
  selectedTimePer: EntryItem<number, string>[];

  fetchData(): void;

  createChartData(data: IData): void;

  onSelectCurrency(event: EntryItem<string, string>[]): void;

  onChangeTimePeriod(event: EntryItem<string, string>[]): void;
}
