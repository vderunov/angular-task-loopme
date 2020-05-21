import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { CoinsALLProp, DefResponse, IState } from './interfaces';
import { catchError, map } from 'rxjs/operators';
import { IData } from '../info-page/line-chart/interfaces';
import { RequestState } from '../table-page/request-state.model';
import { Currency, TimePeriod } from '../table-page/enums';


@Injectable({
  providedIn: 'root'
})
export class CoinService {
  public arrayCoinsLoaded: CoinsALLProp[] = [];
  public coinById: CoinsALLProp;

  private params = new HttpParams();
  private subject$ = new Subject<CoinsALLProp[]>();
  private currency = Currency;
  private timePeriod = TimePeriod;
  private requestState: RequestState = new RequestState(this.currency[0], this.timePeriod[0], 0, 15, 'desc', '');

  constructor(private http: HttpClient) { }

  public getCoinsBySubscription(): Observable<any> {
    return this.subject$.asObservable();
  }

  public setRequestState(newSettings: object): void {
    this.requestState = {
      ...this.requestState,
      ...newSettings
    };
    this.setParams(this.requestState);
    this.fetchData().subscribe(res => {
      this.subject$.next(res);
    });
  }

  public fetchData(): Observable<CoinsALLProp[]> {
    return this.http.get<DefResponse>(environment.baseUrl + '/coins?&' + this.params).pipe(
      map((v: DefResponse) => {
        this.arrayCoinsLoaded = v.data.coins;
        return this.arrayCoinsLoaded;
      }),
      catchError(err => {
        console.log(err);
        return throwError(err);
      })
    );
  }

  public setParams(state: IState) {
    Object.keys(state).forEach(k => {
      if (state[k] !== '') {
        this.params = this.params.set(k, state[k]);
      } else {
        this.params = this.params.delete(k);
      }
    });
  }

  public fetchCoinHistory(coinId, timeFrame = '30d', currency = 'USD'): Observable<any> {
    return this.http.get<Observable<IData>>(`${environment.baseUrl}/coin/${coinId}/history/${timeFrame}?base=${currency}`)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      );
  }

  public getById(id: number): Observable<CoinsALLProp> {
    return this.fetchData().pipe(
      map((v: CoinsALLProp[]) => {
          this.coinById = v.find(coin => coin.id === id);
          return this.coinById;
        }
      ));
  }
}
