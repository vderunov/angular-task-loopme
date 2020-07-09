import { Action } from '@ngrx/store';
import { ICoinALLProp } from '../../models/coin.interface';
import { IData } from '../../info-page/line-chart/interfaces';


export enum EAdditionalInfoActions {
  GetCoinById = '[Additional Info] Get Coin By Id',
  GetCoinByIdSuccess = '[Additional Info] Get Coin By Id Success',
  GetCoinByIdFailure = '[Additional Info] Get Coin By Id Failure',
  GetCoinHistoryFailure = '[Additional Info] Get Coin History Failure',
  GetCoinHistory = '[Additional Info] Get Coin History',
  GetCoinHistorySuccess = '[Additional Info] Get Coin History Success',
  ResetAdditionInfoState = '[Additional Info] Reset Addition Info State'
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

export class GetCoinHistoryFailure implements Action {
  public readonly type = EAdditionalInfoActions.GetCoinHistoryFailure;

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

export class ResetAdditionInfoState implements Action {
  public readonly type = EAdditionalInfoActions.ResetAdditionInfoState;
}

export type AdditionalInfoActions =
  GetCoinById |
  GetCoinByIdSuccess |
  GetCoinHistory |
  GetCoinHistorySuccess |
  GetCoinByIdFailure |
  GetCoinHistoryFailure |
  ResetAdditionInfoState;
