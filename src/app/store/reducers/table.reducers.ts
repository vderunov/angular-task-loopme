import { initialTableState, ITableState } from '../state/table.state';
import { ETableActions, TableActions } from '../actions/table.actions';


export const tableReducers = (
  state = initialTableState,
  action: TableActions,
): ITableState => {
  switch (action.type) {
    case ETableActions.GetCoinsSuccess:
      return {
        ...state,
        coins: action.payload,
      };
    case ETableActions.GetCoinsSelectByCurrencySuccess:
      return {
        ...state,
        coins: action.payload,
      };
    case ETableActions.GetCoinsByTimePeriodSuccess:
      return {
        ...state,
        coins: action.payload,
      };
    case ETableActions.GetCoinsByOrderSuccess:
      return {
        ...state,
        coins: action.payload,
      };
    case ETableActions.GetCoinsPaginationSuccess:
      return {
        ...state,
        coins: action.payload,
      };
    case ETableActions.GetSearchCoinBySymbolsSuccess:
      return {
        ...state,
        coins: action.payload,
      };
    default:
      return state;
  }
};
