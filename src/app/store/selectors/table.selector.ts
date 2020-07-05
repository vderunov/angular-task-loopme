import { IAppState } from '../state/app.state';
import { createSelector } from '@ngrx/store';
import { ITableState } from '../state/table.state';

const selectCoins = (state: IAppState) => state.table;

export const selectCoinsList = createSelector(
  selectCoins,
  (state: ITableState) => state.coins,
);
