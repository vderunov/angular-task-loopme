import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import {
  EntryItem,
  GridLink,
  IGridActionData,
  IPaginationEvent,
  takeUntilDestroy,
} from '@loopme/uikit';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CoinService } from '../shared/coin.service';
import { TablePageData } from './table-page-data';
import { ITableComponent } from './interfaces';
import { Coin, CoinsALLProp } from '../shared/interfaces';
import { Currency, TimePeriod } from './enums';
import { RequestState } from './request-state.model';


@Component({
  selector: 'app-table',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss'],
})
export class TablePageComponent implements OnInit, OnDestroy, ITableComponent {
  public isCoinsNotFound = false;
  public isGridLoading = false;
  public currentPage = 1;
  public totalItems = 100;
  public itemsPerPage = 15;
  public dataPrimitives = TablePageData.dataPrimitives;
  public settingsPrimitives = TablePageData.settingsPrimitives;
  public searchBySymbols$ = new Subject<string>();
  public currencyControl: FormControl;
  public mapCurrency = new Map()
    .set(Currency.USD, 'USD')
    .set(Currency.EUR, 'EUR');
  public mapTimePeriod = new Map()
    .set(TimePeriod.DAY, '24h')
    .set(TimePeriod.WEEK, '7d')
    .set(TimePeriod.MONTH, '30d');
  public optionsSelectorCurr = [
    new EntryItem<number, string>(1, this.mapCurrency.get(0)),
    new EntryItem<number, string>(2, this.mapCurrency.get(1)),
  ];
  public optionsSelectorTimePer = [
    new EntryItem<number, string>(1, this.mapTimePeriod.get(0)),
    new EntryItem<number, string>(2, this.mapTimePeriod.get(1)),
    new EntryItem<number, string>(3, this.mapTimePeriod.get(2)),
  ];
  public selectedCurrency = [new EntryItem<number, string>(1, this.mapCurrency.get(0))];
  public selectedTimePer = [new EntryItem<number, string>(1, this.mapTimePeriod.get(0))];

  constructor(
    private coinService: CoinService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.isGridLoading = true;
    const initRequestState = new RequestState(
      this.mapCurrency.get(0),
      this.mapTimePeriod.get(0),
      0,
      15,
      'desc',
    );

    this.coinService.setRequestState(initRequestState);

    this.coinService.getCoinsBySubscription()
      .pipe(
        takeUntilDestroy(this),
      )
      .subscribe((result) => {
        if (result && result[0]) {
          this.isCoinsNotFound = false;
          this.createCoins(result);
        } else {
          this.dataPrimitives = [];
          this.isGridLoading = false;
          this.isCoinsNotFound = true;
        }
      });

    this.searchBySymbols$
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        tap((symbols) => this.coinService.setRequestState({ symbols })),
        takeUntilDestroy(this),
      ).subscribe();
  }

  public createCoins(coins: CoinsALLProp[]): void {
    this.isGridLoading = false;
    this.dataPrimitives = coins.map((coin: CoinsALLProp): Coin => ({
      id: coin.id,
      name: new GridLink(coin.name, 'google.com'),
      slug: coin.slug,
      symbol: coin.symbol,
      price: +coin.price,
      description: coin.description,
      numberOfMarkets: coin.numberOfMarkets,
      numberOfExchanges: coin.numberOfExchanges,
      change: coin.change,
    }));
  }

  public onGetActionGrid(event: IGridActionData): void {
    if (event.row) {
      this.router.navigate(['/info', event.row.id]);
    }

    if (event.key === 'price' && event.action !== 'none') {
      this.coinService.setRequestState({ order: event.action });
    }
  }

  public onSelectCurrency(event: EntryItem<string, string>[]): void {
    if (event.length) {
      this.coinService.setRequestState({ base: event[0].key });
    }
  }

  public onChangeTimePeriod(event: EntryItem<string, string>[]): void {
    if (event.length) {
      this.coinService.setRequestState({ timePeriod: event[0].key });
    }
  }

  public onPaginationChange(event: IPaginationEvent): void {
    this.currentPage = event.currentPage;
    const pageOffset = (event.currentPage - 1) * event.itemsPerPage;
    this.coinService.setRequestState({ limit: event.itemsPerPage, offset: pageOffset });
  }

  public onSearchBySymbols(event: Event): void {
    this.isCoinsNotFound = false;
    this.isGridLoading = true;
    const { value } = event.target as HTMLInputElement;
    this.searchBySymbols$.next(value);
  }

  public ngOnDestroy(): void { }
}
