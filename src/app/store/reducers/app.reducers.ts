import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { tableReducers } from './table.reducers';

export const appReducers: ActionReducerMap<IAppState, any> = {
  table: tableReducers
};
