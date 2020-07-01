import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoinsALLProp, IdCoinResp } from './interfaces';
import { catchError, map } from 'rxjs/operators';
import { IData } from '../info-page/line-chart/interfaces';

import * as _ from 'lodash';


@Injectable({
  providedIn: 'root',
})
export class CoinService {
  public coinById: CoinsALLProp;
  public coinByIdSubject$ = new BehaviorSubject<null | CoinsALLProp>(null);

  constructor(private http: HttpClient) { }

  public getCoinByIdSubject$(): Observable<null | CoinsALLProp> {
    return this.coinByIdSubject$.asObservable();
  }

  public fetchCoinHistory(
    coinId,
    timeFrame = '30d',
    currency = 'USD',
  ): Observable<IData | object> {
    return this.http.get<Observable<IData>>(`${environment.baseUrl}/coin/${coinId}/history/${timeFrame}?base=${currency}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }),
      );
  }

  public getById(id: number): Observable<CoinsALLProp | boolean> {
    return this.http.get<IdCoinResp | boolean>(`${environment.baseUrl}/coin/${id}`)
      .pipe(
        map((v: IdCoinResp) => {
          this.coinById = _.get(v, 'data.coin');
          this.coinByIdSubject$.next(this.coinById);
          return this.coinById;
        }),
        catchError((err) => {
          console.log(err);
          return of(false);
        }),
      );
  }
}
