import { IAdditionalInfoState, initialAdditionalInfoState } from '../state/additional-info.state';
import { AdditionalInfoActions, EAdditionalInfoActions } from '../actions/additional-info.actions';

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
        error: action.payload,
      };
    default:
      return state;
  }
};
