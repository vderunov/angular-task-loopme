import { Component, OnInit } from '@angular/core';
import { GridLink, IGridActionData } from '@loopme/uikit';
import { CoinService } from '../shared/coin.service';
import { TablePageData } from './table-page-data';
import { RequestStateService } from '../shared/request-state.service';
import { ITableComponent } from './interfaces';
import { Coin, CoinsALLProp } from '../shared/interfaces';
import { Router } from '@angular/router';


@Component({
  selector: 'app-table',
  templateUrl: './table-page.component.html',
  styleUrls: ['./table-page.component.scss']
})
export class TablePageComponent implements OnInit, ITableComponent {

  public dataPrimitives = TablePageData.dataPrimitives;
  public settingsPrimitives = TablePageData.settingsPrimitives;
  public isExistingId = this.coinService.isExistingId;

  constructor(
    private coinService: CoinService,
    private requestStateService: RequestStateService,
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    if (this.coinService.arrayCoins) {
      this.createCoins(this.coinService.arrayCoins);
    }

    this.coinService.streamCoins$.subscribe(res => {
      if (res[0]) {
        this.createCoins(res);
      }
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

  public getActionGrid($event: IGridActionData): void {
    if ($event.row) {
      this.router.navigate(['/info', $event.row.id]);
    }

    if ($event.key === 'price' && $event.action !== 'none') {
      this.requestStateService.setState({order: $event.action});
    } else if ($event.key === 'price') {
      this.requestStateService.setState({order: false});
    }
  }
}
