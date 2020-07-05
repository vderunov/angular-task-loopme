import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { tableReducers } from './table.reducers';
import { additionalInfoReducers } from './additional-info.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  table: tableReducers,
  additionalInfo: additionalInfoReducers,
};
