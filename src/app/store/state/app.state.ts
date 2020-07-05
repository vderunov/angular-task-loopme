import { ITableState, initialTableState } from './table.state';
import { IAdditionalInfoState, initialAdditionalInfoState } from './additional-info.state';


export interface IAppState {
  table: ITableState;
  additionalInfo: IAdditionalInfoState;
}

export const initialAppState: IAppState = {
  table: initialTableState,
  additionalInfo: initialAdditionalInfoState,
};

export function getInitialState(): IAppState {
  return initialAppState;
}
