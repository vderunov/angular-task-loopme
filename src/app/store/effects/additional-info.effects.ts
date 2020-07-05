import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';
import { IdCoinResp } from '../../shared/interfaces';
import { of, throwError } from 'rxjs';
import {
  EAdditionalInfoActions,
  GetCoinById, GetCoinByIdFailure,
  GetCoinByIdSuccess,
  GetCoinHistory,
  GetCoinHistorySuccess,
} from '../actions/additional-info.actions';
import { AdditionalInfoService } from '../../services/additional-info.service';
import * as _ from 'lodash';
import { IData } from '../../info-page/line-chart/interfaces';


@Injectable()
export class AdditionalInfoEffects {
  @Effect()
  getCoinHistory$ = this.actions$.pipe(
    ofType<GetCoinHistory>(EAdditionalInfoActions.GetCoinHistory),
    switchMap((historyParams) => this.additionalInfoService.fetchCoinHistory(historyParams.payload)),
    switchMap((response: IData) => of(new GetCoinHistorySuccess(response))),
    catchError((err) => {
      console.log(err);
      return throwError(err);
    }),
  );

  @Effect()
  getCoinById$ = this.actions$.pipe(
    ofType<GetCoinById>(EAdditionalInfoActions.GetCoinById),
    switchMap((id) => this.additionalInfoService.getById(id.payload)),
    switchMap((response: IdCoinResp) => {
      const coin = _.get(response, 'data.coin');
      return of(new GetCoinByIdSuccess(coin));
    }),
    catchError((err) => {
      console.log(err);
      return of(new GetCoinByIdFailure(err));
    }),
  );

  constructor(
    private additionalInfoService: AdditionalInfoService,
    private actions$: Actions,
  ) {}
}
