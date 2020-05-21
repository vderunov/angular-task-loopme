import { FormControl } from '@angular/forms';

import { TablePageData } from './table-page-data';
import { CoinsALLProp } from '../shared/interfaces';
import { EntryItem, IGridActionData, IPaginationEvent } from '@loopme/uikit';
import { Subject, Subscription } from 'rxjs';

export interface ITableComponent {
  dataPrimitives: TablePageData;
  settingsPrimitives: TablePageData;
  subscriptionGetCoins: Subscription;
  subscriptionFetch: Subscription;
  subscriptionSearchBySymbols: Subscription;
  searchBySymbols$: Subject<any>;
  currencyControl: FormControl;
  optionsSelectorCurr: EntryItem<number, string>[];
  optionsSelectorTimePer: EntryItem<number, string>[];
  selectedCurrency: EntryItem<number, string>[];
  selectedTimePer: EntryItem<number, string>[];

  initFetchCoins(): void;

  createCoins(coins: CoinsALLProp[]): void;

  getActionGrid(event: IGridActionData): void;

  onPaginationChange(event: IPaginationEvent): void;

  searchBySymbols(event: Event): void;

  onSelectCurrency(event: EntryItem<any, any>[]): void;

  onChangeTimePeriod(event: EntryItem<any, any>[]): void;
}
