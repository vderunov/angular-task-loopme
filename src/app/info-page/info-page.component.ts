import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoinService } from '../shared/coin.service';
import { CoinsALLProp } from '../shared/interfaces';


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {
  public coin: CoinsALLProp;

  constructor(private route: ActivatedRoute, private coinService: CoinService) { }

  public ngOnInit(): void {
    this.coin = this.coinService.coinById;
  }
}
