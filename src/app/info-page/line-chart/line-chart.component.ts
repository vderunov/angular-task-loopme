import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ChartTypes, Dimension, EntryItem } from '@loopme/uikit';
import { IChartLineItem, IData, IHistory, ILineChartComponent } from './interfaces';
import { Currency, TimePeriod } from './enums';
import { CoinsALLProp } from '../../shared/interfaces';
import { select, Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { GetCoinHistory } from '../../store/actions/additional-info.actions';
import { selectCoinHistory } from '../../store/selectors/additional-info.selector';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnDestroy, ILineChartComponent {
  @Input() coin: CoinsALLProp;

  public chartLineData: IChartLineItem[];
  public history: IHistory[] = [];
  public isChartReady = false;
  public currencyParam: string;
  public timeFrameParam: string;
  public chartTypes = ChartTypes;
  public editing: boolean;
  public coinHistoryData$ = this.store.pipe(select(selectCoinHistory));
  public activeLineMetrics = [
    {
      yAxisKey: 'price', xAxisKey: 'date', name: 'Price, $', dimension: Dimension.DOLLARS, color: '#3f51b5',
    },
  ];
  public mapCurrency = new Map()
    .set(Currency.USD, 'USD')
    .set(Currency.EUR, 'EUR')
    .set(Currency.JPY, 'JPY')
    .set(Currency.BTC, 'BTC')
    .set(Currency.ETH, 'ETH');
  public mapTimePeriod = new Map()
    .set(TimePeriod.DAY, '24h')
    .set(TimePeriod.WEEK, '7d')
    .set(TimePeriod.MONTH, '30d')
    .set(TimePeriod.YEAR, '1y')
    .set(TimePeriod.FIVE_YEARS, '5y');
  public optionsSelectorCurr = [
    new EntryItem<number, string>(1, this.mapCurrency.get(0)),
    new EntryItem<number, string>(2, this.mapCurrency.get(1)),
    new EntryItem<number, string>(3, this.mapCurrency.get(2)),
    new EntryItem<number, string>(4, this.mapCurrency.get(3)),
    new EntryItem<number, string>(5, this.mapCurrency.get(4)),
  ];
  public optionsSelectorTimePer = [
    new EntryItem<number, string>(1, this.mapTimePeriod.get(0)),
    new EntryItem<number, string>(2, this.mapTimePeriod.get(1)),
    new EntryItem<number, string>(3, this.mapTimePeriod.get(2)),
    new EntryItem<number, string>(4, this.mapTimePeriod.get(3)),
    new EntryItem<number, string>(5, this.mapTimePeriod.get(4)),
  ];
  public selectedCurrency = [new EntryItem<number, string>(1, this.mapCurrency.get(0))];
  public selectedTimePer = [new EntryItem<number, string>(1, this.mapTimePeriod.get(0))];
  public subscription: Subscription;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(new GetCoinHistory({ coinId: this.coin.id, timeFrame: this.timeFrameParam, currency: this.currencyParam }));
    this.subscription = this.coinHistoryData$.subscribe((result) => {
      if (result) {
        this.createChartData(result);
      }
    });
  }

  public createChartData(data: IData): void {
    const everyNthElementInArray = 20;
    let i = 0;

    this.chartLineData = data.data.history
      .filter(() => (++i) % everyNthElementInArray === 0)
      .map((item) => ({
        date: item.timestamp.toString(),
        price: item.price,
      }));
    this.isChartReady = true;
  }

  public onSelectCurrency(event: EntryItem<string, string>[]): void {
    if (event.length) {
      this.store.dispatch(new GetCoinHistory({ coinId: this.coin.id, timeFrame: this.timeFrameParam, currency: event[0].key }));
    }
  }

  public onChangeTimePeriod(event: EntryItem<string, string>[]): void {
    if (event.length) {
      this.store.dispatch(new GetCoinHistory({ coinId: this.coin.id, timeFrame: event[0].key, currency: this.currencyParam }));
    }
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
