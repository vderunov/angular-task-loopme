import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-additional-coin-info',
  templateUrl: './additional-coin-info.component.html',
  styleUrls: ['./additional-coin-info.component.scss']
})
export class AdditionalCoinInfoComponent {

  @Input() coin: any;

}
