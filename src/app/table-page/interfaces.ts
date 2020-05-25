import { FormControl } from '@angular/forms';

import { TablePageData } from './table-page-data';
import { CoinsALLProp } from '../shared/interfaces';
import { EntryItem, IGridActionData, IPaginationEvent } from '@loopme/uikit';
import { Subject, Subscription } from 'rxjs';

export interface ITableComponent {
  isCoinsNotFound: boolean;
  isGridLoading: boolean;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  dataPrimitives: TablePageData;
  settingsPrimitives: TablePageData;
  subGetCoins: Subscription;
  subSearchBySymbols: Subscription;
  searchBySymbols$: Subject<string>;
  currencyControl: FormControl;
  optionsSelectorCurr: EntryItem<number, string>[];
  optionsSelectorTimePer: EntryItem<number, string>[];
  selectedCurrency: EntryItem<number, string>[];
  selectedTimePer: EntryItem<number, string>[];

  createCoins(coins: CoinsALLProp[]): void;

  onGetActionGrid(event: IGridActionData): void;

  onPaginationChange(event: IPaginationEvent): void;

  onSearchBySymbols(event: Event): void;

  onSelectCurrency(event: EntryItem<string, string>[]): void;

  onChangeTimePeriod(event: EntryItem<string, string>[]): void;
}
