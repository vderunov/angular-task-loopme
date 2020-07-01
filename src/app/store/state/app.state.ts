import { initialTableState, ITableState } from './table.state';


export interface IAppState {
  table: ITableState;
}

export const initialAppState: IAppState = {
  table: initialTableState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
