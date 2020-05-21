import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { EntryItem, GridLink, IGridActionData, IPaginationEvent, IUIKitNotificationsOptions } from '@loopme/uikit';
import { CoinService } from '../shared/coin.service';
import { TablePageData } from './table-page-data';
import { ITableComponent } from './interfaces';
import { Coin, CoinsALLProp } from '../shared/interfaces';
import { Currency, TimePeriod } from './enums';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-table',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit, OnDestroy, ITableComponent {
  public dataPrimitives = TablePageData.dataPrimitives;
  public settingsPrimitives = TablePageData.settingsPrimitives;
  public subscriptionGetCoins: Subscription;
  public subscriptionFetch: Subscription;
  public subscriptionSearchBySymbols: Subscription;
  public currency = Currency;
  public timePeriod = TimePeriod;
  public searchBySymbols$ = new Subject<string>();
  public currencyControl: FormControl;
  public options: IUIKitNotificationsOptions = {
    timeOut: 3000,
    pauseOnHover: true,
    lastOnBottom: false,
  };
  public optionsSelectorCurr: EntryItem<number, string>[] = [
    new EntryItem<number, string>(this.currency.USD, this.currency[0]),
    new EntryItem<number, string>(this.currency.EUR, this.currency[1]),
  ];
  public optionsSelectorTimePer: EntryItem<number, string>[] = [
    new EntryItem<number, string>(this.timePeriod['24h'], this.timePeriod[0]),
    new EntryItem<number, string>(this.timePeriod['7d'], this.timePeriod[1]),
    new EntryItem<number, string>(this.timePeriod['30d'], this.timePeriod[2]),
  ];
  public selectedCurrency: EntryItem<number, string>[] = [new EntryItem<number, string>(this.currency.USD, this.currency[0])];
  public selectedTimePer: EntryItem<number, string>[] = [new EntryItem<number, string>(this.timePeriod['24h'], this.timePeriod[0])];

  constructor(private coinService: CoinService, private router: Router) { }

  public ngOnInit(): void {
    if (this.coinService.arrayCoinsLoaded) {
      this.createCoins(this.coinService.arrayCoinsLoaded);
    }

    this.subscriptionGetCoins = this.coinService.getCoinsBySubscription().subscribe(result => {
      if (result[0]) {
        this.createCoins(result);
      }
    });

    this.subscriptionSearchBySymbols = this.searchBySymbols$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(value => {
      value ? this.coinService.setRequestState({symbols: value}) : this.coinService.setRequestState({symbols: ''});
    });
    this.initFetchCoins();
  }

  public initFetchCoins(): void {
    this.subscriptionFetch = this.coinService.fetchData().subscribe(result => {
      this.createCoins(result);
    });
  }

  public createCoins(coins: CoinsALLProp[]): void {
    this.dataPrimitives = coins.map((coin: CoinsALLProp): Coin => {
      return {
        id: coin.id,
        name: new GridLink(coin.name, 'google.com'),
        slug: coin.slug,
        symbol: coin.symbol,
        price: +coin.price,
        description: coin.description,
        numberOfMarkets: coin.numberOfMarkets,
        numberOfExchanges: coin.numberOfExchanges,
        change: coin.change
      };
    });
  }

  public getActionGrid(event: IGridActionData): void {
    if (event.row) {
      this.router.navigate(['/info', event.row.id]);
    }

    if (event.key === 'price' && event.action !== 'none') {
      this.coinService.setRequestState({order: event.action});
    } else if (event.key === 'price') {
      this.coinService.setRequestState({order: ''});
    }
  }

  public onSelectCurrency(event: EntryItem<any, any>[]): void {
    if (event.length) {
      this.coinService.setRequestState({base: event[0].key});
    }
  }

  public onChangeTimePeriod(event: EntryItem<any, any>[]): void {
    if (event.length) {
      this.coinService.setRequestState({timePeriod: event[0].key});
    }
  }

  public onPaginationChange(event: IPaginationEvent): void {
    this.coinService.setRequestState({limit: event.itemsPerPage, offset: event.itemsPerPage * (event.currentPage - 1)});
  }

  public searchBySymbols(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchBySymbols$.next(value);
  }

  public ngOnDestroy(): void {
    this.subscriptionGetCoins.unsubscribe();
    this.subscriptionFetch.unsubscribe();
    this.subscriptionSearchBySymbols.unsubscribe();
  }
}
