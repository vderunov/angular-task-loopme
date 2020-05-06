import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoinService } from '../shared/coin.service';
import { ILineChartComponent } from './interfaces';


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, ILineChartComponent {

  public coin: boolean | object = false;

  constructor(
    private route: ActivatedRoute,
    private coinService: CoinService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const isCoinsLoad = this.coinService.arrayCoins;
    if (isCoinsLoad) {
      this.route.params.subscribe((params: Params) => {
        this.coin = this.coinService.getById(+params.id);
      });
    } else {
      this.coinService.fetchData({});
      this.coinService.streamCoins$.subscribe(coins => {
        this.getCoin(coins);
      });
    }
  }

  public getCoin(coins): void {
    this.route.params.subscribe((params: Params) => {
      this.coin = this.coinService.getById(+params.id, coins);

      if (!this.coin) {
        this.router.navigate(['']);
      }
    });
  }
}
