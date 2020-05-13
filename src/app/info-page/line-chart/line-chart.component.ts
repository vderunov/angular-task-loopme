import { Component, Input, OnInit } from '@angular/core';

import { ChartTypes, Dimension } from '@loopme/uikit';
import { CoinService } from '../../shared/coin.service';
import { IChartLineItem, IData, IHistory, ILineChartComponent } from './interfaces';
import { Currency, TimePeriod } from './enums';
import { CoinsALLProp } from '../../shared/interfaces';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, ILineChartComponent {
  @Input() coin: CoinsALLProp;

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

  constructor(private coinService: CoinService) {
  }

  public ngOnInit(): void {
    this.fetchData();
  }

  public fetchData(): void {
    this.coinService.fetchCoinHistory(this.coin.id, this.timeFrameParam, this.currencyParam).subscribe((result: IData) => {
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

  public changeCurrHandler(event: Event): void {
    this.currencyParam = (event.target as HTMLInputElement).value;
    this.fetchData();
  }

  public changeTimePeriodHandler(event: Event): void {
    this.timeFrameParam = (event.target as HTMLInputElement).value;
    this.fetchData();
  }
}
