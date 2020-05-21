import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ChartTypes, Dimension, EntryItem } from '@loopme/uikit';
import { CoinService } from '../../shared/coin.service';
import { IChartLineItem, IData, IHistory, ILineChartComponent } from './interfaces';
import { Currency, TimePeriod } from './enums';
import { CoinsALLProp } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy, ILineChartComponent {
  @Input() coin: CoinsALLProp;

  public subscriptionFetch: Subscription;
  public history: IHistory[] = [];
  public isChartReady = false;
  public currency = Currency;
  public timePeriod = TimePeriod;
  public currencyParam: string;
  public timeFrameParam: string;
  public chartTypes = ChartTypes;
  public editing: boolean;
  public chartLineData: IChartLineItem[];
  public activeLineMetrics = [
    {yAxisKey: 'price', xAxisKey: 'date', name: 'Price, $', dimension: Dimension.DOLLARS, color: '#3f51b5'},
  ];
  public optionsSelectorCurr: EntryItem<number, string>[] = [
    new EntryItem<number, string>(this.currency.USD, this.currency[0]),
    new EntryItem<number, string>(this.currency.EUR, this.currency[1]),
    new EntryItem<number, string>(this.currency.ETH, this.currency[2]),
    new EntryItem<number, string>(this.currency.BTC, this.currency[3]),
    new EntryItem<number, string>(this.currency.JPY, this.currency[4]),
  ];
  public optionsSelectorTimePer: EntryItem<number, string>[] = [
    new EntryItem<number, string>(this.timePeriod['24h'], this.timePeriod[0]),
    new EntryItem<number, string>(this.timePeriod['7d'], this.timePeriod[1]),
    new EntryItem<number, string>(this.timePeriod['30d'], this.timePeriod[2]),
    new EntryItem<number, string>(this.timePeriod['1y'], this.timePeriod[3]),
    new EntryItem<number, string>(this.timePeriod['5y'], this.timePeriod[4]),
  ];
  public selectedCurrency: EntryItem<number, string>[] = [new EntryItem<number, string>(this.currency.USD, this.currency[0])];
  public selectedTimePer: EntryItem<number, string>[] = [new EntryItem<number, string>(this.timePeriod['24h'], this.timePeriod[0])];

  constructor(private coinService: CoinService) { }

  public ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(): void {
    this.subscriptionFetch = this.coinService.fetchCoinHistory(this.coin.id, this.timeFrameParam, this.currencyParam)
      .subscribe((result: IData) => {
        this.createChartData(result);
      });
  }

  public createChartData(data: IData): void {
    const everyNthElementInArray = 20;
    let i = 0;
    this.chartLineData = data.data.history.filter(() => (++i) % everyNthElementInArray === 0).map(item => ({
      date: item.timestamp.toString(),
      price: item.price
    }));
    this.isChartReady = true;
  }

  public onSelectCurrency(event: EntryItem<any, any>[]): void {
    if (event.length) {
      this.currencyParam = event[0].key;
      this.fetchData();
    }
  }

  public onChangeTimePeriod(event: EntryItem<any, any>[]): void {
    if (event.length) {
      this.timeFrameParam = event[0].key;
      this.fetchData();
    }
  }

  public ngOnDestroy(): void {
    this.subscriptionFetch.unsubscribe();
  }
}
