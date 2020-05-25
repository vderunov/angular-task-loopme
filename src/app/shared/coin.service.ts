import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoinsALLProp, DefResponse, IdCoinResp, IState } from './interfaces';
import { catchError, map } from 'rxjs/operators';
import { IData } from '../info-page/line-chart/interfaces';
import { RequestState } from '../table-page/request-state.model';
import { Currency, TimePeriod } from '../table-page/enums';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root',
})
export class CoinService {
  public coinById: CoinsALLProp;

  private params: HttpParams;
  private coinsSubject$ = new Subject<CoinsALLProp[]>();
  private currency = Currency;
  private timePeriod = TimePeriod;
  private requestState: RequestState = new RequestState(
    this.currency[0],
    this.timePeriod[0],
    0,
    15,
    'desc',
  );

  constructor(private http: HttpClient) { }

  public getCoinsBySubscription(): Observable<CoinsALLProp[]> {
    return this.coinsSubject$.asObservable();
  }

  public setRequestState(newSettings: object): void {
    this.requestState = {
      ...this.requestState,
      ...newSettings,
    };
    this.setParams(this.requestState);
    this.fetchData().subscribe((res) => {
      this.coinsSubject$.next(res);
    });
  }

  public fetchData(): Observable<CoinsALLProp[]> {
    return this.http.get<DefResponse>(`${environment.baseUrl}/coins?&${this.params}`)
      .pipe(
        map((v: DefResponse) => _.get(v, 'data.coins')),
        catchError((err) => {
          console.log(err);
          return throwError(err);
        }),
      );
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
          return this.coinById;
        }),
        catchError((err) => {
          console.log(err);
          return of(false);
        }),
      );
  }

  private setParams(state: IState): void {
    this.params = new HttpParams({
      fromObject: {
        base: state.base,
        timePeriod: state.timePeriod,
        offset: state.offset.toString(),
        limit: state.limit.toString(),
        order: state.order,
      },
    });

    if (state.symbols) {
      this.params = this.params.append('symbols', state.symbols);
    }
  }
}
