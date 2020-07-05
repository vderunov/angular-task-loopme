import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { selectCoinById } from '../store/selectors/additional-info.selector';


@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
})
export class InfoPageComponent {
  public coin$ = this.store.pipe(select(selectCoinById));

  constructor(private store: Store<IAppState>) { }
}
