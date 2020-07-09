import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  ETableActions,
  GetCoins,
  GetCoinsByOrder,
  GetCoinsByOrderSuccess,
  GetCoinsByTimePeriod,
  GetCoinsByTimePeriodSuccess,
  GetCoinsPagination,
  GetCoinsPaginationSuccess,
  GetCoinsSelectByCurrency,
  GetCoinsSelectByCurrencySuccess,
  GetCoinsSuccess, GetSearchCoinBySymbols, GetSearchCoinBySymbolsSuccess,
} from '../actions/table.actions';
import {
  catchError, debounceTime, distinctUntilChanged, switchMap,
} from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { TableService } from '../../services/table.service';
import { DefResponse } from '../../shared/interfaces';
import * as _ from 'lodash';


@Injectable()
export class TableEffects {
  @Effect()
  getCoins$ = this.actions$.pipe(
    ofType<GetCoins>(ETableActions.GetCoins),
    switchMap(() => this.tableService.getCoins()),
    switchMap((response: DefResponse) => {
      const coins = _.get(response, 'data.coins');
      return of(new GetCoinsSuccess(coins));
    }),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  @Effect()
  getCoinsByCurrency$ = this.actions$.pipe(
    ofType<GetCoinsSelectByCurrency>(ETableActions.GetCoinsSelectByCurrency),
    switchMap(({ payload }) => this.tableService.getCoins(payload)),
    switchMap((response: DefResponse) => {
      const coins = _.get(response, 'data.coins');
      return of(new GetCoinsSelectByCurrencySuccess(coins));
    }),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  @Effect()
  getCoinsByTimePeriod$ = this.actions$.pipe(
    ofType<GetCoinsByTimePeriod>(ETableActions.GetCoinsByTimePeriod),
    switchMap(({ payload }) => this.tableService.getCoins(payload)),
    switchMap((response: DefResponse) => {
      const coins = _.get(response, 'data.coins');
      return of(new GetCoinsByTimePeriodSuccess(coins));
    }),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  @Effect()
  getCoinsByOrder$ = this.actions$.pipe(
    ofType<GetCoinsByOrder>(ETableActions.GetCoinsByOrder),
    switchMap(({ payload }) => this.tableService.getCoins(payload)),
    switchMap((response: DefResponse) => {
      const coins = _.get(response, 'data.coins');
      return of(new GetCoinsByOrderSuccess(coins));
    }),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  @Effect()
  getCoinsPagination$ = this.actions$.pipe(
    ofType<GetCoinsPagination>(ETableActions.GetCoinsPagination),
    switchMap(({ payload }) => this.tableService.getCoins(payload)),
    switchMap((response: DefResponse) => {
      const coins = _.get(response, 'data.coins');
      return of(new GetCoinsPaginationSuccess(coins));
    }),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  @Effect()
  getSearchCoinBySymbols$ = this.actions$.pipe(
    ofType<GetSearchCoinBySymbols>(ETableActions.GetSearchCoinBySymbols),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(({ payload }) => this.tableService.getCoins(payload)),
    switchMap((response: DefResponse) => {
      const coins = _.get(response, 'data.coins');
      return of(new GetSearchCoinBySymbolsSuccess(coins));
    }),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  constructor(
    private tableService: TableService,
    private actions$: Actions,
  ) {}
}
