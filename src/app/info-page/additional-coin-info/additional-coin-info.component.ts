import { Component, Input } from '@angular/core';

import { ButtonStyleType } from '@loopme/uikit';
import { CoinsALLProp } from '../../shared/interfaces';


@Component({
  selector: 'app-additional-coin-info',
  templateUrl: './additional-coin-info.component.html',
  styleUrls: ['./additional-coin-info.component.scss'],
})
export class AdditionalCoinInfoComponent {
  @Input() coin: CoinsALLProp;

  public ButtonStyleType = ButtonStyleType;
  public btnText = 'Back';
}
