import { Action } from '@ngrx/store';
import { ICoinALLProp } from '../../models/coin.interface';


export enum ETableActions {
  GetCoins = '[Table] Get Coins',
  GetCoinsSuccess = '[Table] Get Coins Success',
  GetCoinsSelectByCurrency = '[Table] Get Coins Select By Currency',
  GetCoinsSelectByCurrencySuccess = '[Table] Get Coins Select By Currency Success',
  GetCoinsByTimePeriod = '[Table] Get Coins By TimePeriod',
  GetCoinsByTimePeriodSuccess = '[Table] Get Coins By TimePeriod Success',
  GetCoinsByOrder = '[Table] Get Coins By Order',
  GetCoinsByOrderSuccess = '[Table] Get Coins By Order Success',
  GetCoinsPagination = '[Table] Get Coins Pagination',
  GetCoinsPaginationSuccess = '[Table] Get Coins Pagination Success',
  GetSearchCoinBySymbols = '[Table] Get Coin By Symbols',
  GetSearchCoinBySymbolsSuccess = '[Table] Get Coin By Symbols Success'
}

export class GetCoins implements Action {
  public readonly type = ETableActions.GetCoins;
}

export class GetCoinsSuccess implements Action {
  public readonly type = ETableActions.GetCoinsSuccess;

  constructor(public payload: ICoinALLProp[]) {}
}

export class GetCoinsSelectByCurrency implements Action {
  public readonly type = ETableActions.GetCoinsSelectByCurrency;

  constructor(public payload: object) {}
}

export class GetCoinsSelectByCurrencySuccess implements Action {
  public readonly type = ETableActions.GetCoinsSelectByCurrencySuccess;

  constructor(public payload: ICoinALLProp[]) {}
}

export class GetCoinsByTimePeriod implements Action {
  public readonly type = ETableActions.GetCoinsByTimePeriod;

  constructor(public payload: object) {}
}

export class GetCoinsByTimePeriodSuccess implements Action {
  public readonly type = ETableActions.GetCoinsByTimePeriodSuccess;

  constructor(public payload: ICoinALLProp[]) {}
}

export class GetCoinsByOrder implements Action {
  public readonly type = ETableActions.GetCoinsByOrder;

  constructor(public payload: object) {}
}

export class GetCoinsByOrderSuccess implements Action {
  public readonly type = ETableActions.GetCoinsByOrderSuccess;

  constructor(public payload: ICoinALLProp[]) {}
}

export class GetCoinsPagination implements Action {
  public readonly type = ETableActions.GetCoinsPagination;

  constructor(public payload: object) {}
}

export class GetCoinsPaginationSuccess implements Action {
  public readonly type = ETableActions.GetCoinsPaginationSuccess;

  constructor(public payload: ICoinALLProp[]) {}
}

export class GetSearchCoinBySymbols implements Action {
  public readonly type = ETableActions.GetSearchCoinBySymbols;

  constructor(public payload: object) {}
}

export class GetSearchCoinBySymbolsSuccess implements Action {
  public readonly type = ETableActions.GetSearchCoinBySymbolsSuccess;

  constructor(public payload: ICoinALLProp[]) {}
}

export type TableActions =
  GetCoins |
  GetCoinsSuccess |
  GetCoinsSelectByCurrency |
  GetCoinsSelectByCurrencySuccess |
  GetCoinsByTimePeriod |
  GetCoinsByTimePeriodSuccess |
  GetCoinsByOrder |
  GetCoinsByOrderSuccess |
  GetCoinsPagination |
  GetCoinsPaginationSuccess |
  GetSearchCoinBySymbols |
  GetSearchCoinBySymbolsSuccess;

