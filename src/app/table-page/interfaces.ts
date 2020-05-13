import { TablePageData } from './table-page-data';
import { CoinsALLProp } from '../shared/interfaces';
import { IGridActionData, IPaginationEvent } from '@loopme/uikit';
import { Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface ITableComponent {
  dataPrimitives: TablePageData;
  settingsPrimitives: TablePageData;
  subscription: Subscription;
  subscriptionFetch: Subscription;
  searchBySymbols$: Subject<any>;
  currencyControl: FormControl;
  timePeriodValue: string;

  initFetchCoins(): void;

  createCoins(coins: CoinsALLProp[]): void;

  getActionGrid(event: IGridActionData): void;

  onPaginationChange(event: IPaginationEvent): void;

  searchBySymbols(event: Event): void;

  changeTimePeriod(): void;
}