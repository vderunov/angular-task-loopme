import { createSelector } from '@ngrx/store';
import { IAdditionalInfoState } from '../state/additional-info.state';
import { IAppState } from '../state/app.state';

const selectCoin = (state: IAppState) => state.additionalInfo;

export const selectCoinById = createSelector(
  selectCoin,
  (state: IAdditionalInfoState) => state.coin,
);

export const selectCoinHistory = createSelector(
  selectCoin,
  (state: IAdditionalInfoState) => state.coinHistory,
);

export const selectCoinByIdFailure = createSelector(
  selectCoin,
  (state: IAdditionalInfoState) => state.error,
);
