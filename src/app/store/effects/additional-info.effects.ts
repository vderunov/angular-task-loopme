import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError, map, switchMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import * as _ from 'lodash';
import { IdCoinResp } from '../../shared/interfaces';
import {
  EAdditionalInfoActions,
  GetCoinById, GetCoinByIdFailure,
  GetCoinByIdSuccess,
  GetCoinHistory, GetCoinHistoryFailure,
  GetCoinHistorySuccess,
} from '../actions/additional-info.actions';
import { AdditionalInfoService } from '../../services/additional-info.service';
import { IData } from '../../info-page/line-chart/interfaces';


@Injectable()
export class AdditionalInfoEffects {
  @Effect()
  getCoinHistory$ = this.actions$.pipe(
    ofType<GetCoinHistory>(EAdditionalInfoActions.GetCoinHistory),
    switchMap(({ payload }) => this.additionalInfoService.fetchCoinHistory(payload)
      .pipe(
        map((response: IData) => new GetCoinHistorySuccess(response)),
        catchError((err) => {
          console.log(err);
          return of(new GetCoinHistoryFailure(err));
        }),
      )),
  );

  @Effect()
  getCoinById$ = this.actions$.pipe(
    ofType<GetCoinById>(EAdditionalInfoActions.GetCoinById),
    switchMap(({ payload }) => this.additionalInfoService.getById(payload)
      .pipe(
        map((response: IdCoinResp) => {
          const coin = _.get(response, 'data.coin');
          return new GetCoinByIdSuccess(coin);
        }),
        catchError((err) => {
          console.log(err);
          return of(new GetCoinByIdFailure(err));
        }),
      )),
  );

  constructor(
    private additionalInfoService: AdditionalInfoService,
    private actions$: Actions,
  ) {}
}
