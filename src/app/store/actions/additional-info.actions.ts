import { Action } from '@ngrx/store';
import { ICoinALLProp } from '../../models/coin.interface';
import { IData } from '../../info-page/line-chart/interfaces';


export enum EAdditionalInfoActions {
  GetCoinById = '[Table] Get Coin By Id',
  GetCoinByIdSuccess = '[Table] Get Coin By Id Success',
  GetCoinByIdFailure = '[Table] Get Coin By Id Failure',
  GetCoinHistory = '[Table] Get Coin History',
  GetCoinHistorySuccess = '[Table] Get Coin History Success'
}

export class GetCoinById implements Action {
  public readonly type = EAdditionalInfoActions.GetCoinById;

  constructor(public payload: number) {}
}

export class GetCoinByIdSuccess implements Action {
  public readonly type = EAdditionalInfoActions.GetCoinByIdSuccess;

  constructor(public payload: ICoinALLProp) {}
}

export class GetCoinByIdFailure implements Action {
  public readonly type = EAdditionalInfoActions.GetCoinByIdFailure;

  constructor(public payload: Error) { }
}

export class GetCoinHistory implements Action {
  public readonly type = EAdditionalInfoActions.GetCoinHistory;

  constructor(public payload: { coinId: number; timeFrame: string; currency: string }) {}
}

export class GetCoinHistorySuccess implements Action {
  public readonly type = EAdditionalInfoActions.GetCoinHistorySuccess;

  constructor(public payload: IData) {}
}

export type AdditionalInfoActions =
  GetCoinById |
  GetCoinByIdSuccess |
  GetCoinHistory |
  GetCoinHistorySuccess |
  GetCoinByIdFailure;
