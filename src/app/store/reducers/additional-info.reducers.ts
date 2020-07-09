import { IAdditionalInfoState, initialAdditionalInfoState } from '../state/additional-info.state';
import { AdditionalInfoActions, EAdditionalInfoActions } from '../actions/additional-info.actions';
import * as _ from 'lodash';

export const additionalInfoReducers = (
  state = initialAdditionalInfoState,
  action: AdditionalInfoActions,
): IAdditionalInfoState => {
  switch (action.type) {
    case EAdditionalInfoActions.GetCoinByIdSuccess:
      return {
        ...state,
        coin: action.payload,
      };
    case EAdditionalInfoActions.GetCoinHistorySuccess:
      return {
        ...state,
        coinHistory: action.payload,
      };
    case EAdditionalInfoActions.GetCoinByIdFailure:
      return {
        ...state,
        errorId: action.payload,
      };
    case EAdditionalInfoActions.GetCoinHistoryFailure:
      return {
        ...state,
        errorInfo: action.payload,
      };
    case EAdditionalInfoActions.ResetAdditionInfoState:
      return {
        ..._.cloneDeep(initialAdditionalInfoState),
      };
    default:
      return state;
  }
};
