import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { GridLink, IGridActionData, IPaginationEvent, IUIKitNotificationsOptions } from '@loopme/uikit';
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
  public timePeriodValue = TimePeriod.DAY;
  public options: IUIKitNotificationsOptions = {
    timeOut: 3000,
    pauseOnHover: true,
    lastOnBottom: false,
  };

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

    this.currencyControl = new FormControl(this.currency.USD);
    this.currencyControl.valueChanges.subscribe((currency: string) => {
      this.coinService.setRequestState({base: currency});
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

  public onPaginationChange(event: IPaginationEvent): void {
    this.coinService.setRequestState({limit: event.itemsPerPage, offset: event.itemsPerPage * (event.currentPage - 1)});
  }

  public searchBySymbols(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchBySymbols$.next(value);
  }

  public changeTimePeriod(): void {
    this.coinService.setRequestState({timePeriod: this.timePeriodValue});
  }

  public ngOnDestroy(): void {
    this.subscriptionGetCoins.unsubscribe();
    this.subscriptionFetch.unsubscribe();
    this.subscriptionSearchBySymbols.unsubscribe();
  }
}
