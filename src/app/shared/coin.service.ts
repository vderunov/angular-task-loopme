import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CoinsALLProp, IState } from './interfaces';
import { IData } from '../info-page/line-chart/interfaces';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private data$: Subject<object> = new Subject<object>();
  public streamCoins$: Observable<any> = this.data$.asObservable();
  private params = new HttpParams();
  public arrayCoins: CoinsALLProp[];
  public isExistingId: boolean | object = true;

  constructor(private http: HttpClient) {
  }

  public fetchData(state) {
    this.setParams(state);
    this.http.get(environment.baseUrl + '/coins' + '?&' + this.params)
      .pipe(
        catchError(err => {
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe((res: any): any => {
        this.arrayCoins = res.data.coins;
        this.data$.next(this.arrayCoins);
      }, err => {
        console.log(err);
      });
  }

  public setParams(state: IState) {
    for (const prop in state) {
      if (state.hasOwnProperty(prop)) {
        if (state[prop]) {
          this.params = this.params.set(prop, state[prop]);
        } else {
          this.params = this.params.delete(prop);
        }
      }
    }
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

  public getById(id: number, coins = this.arrayCoins) {
    this.isExistingId = coins.find(coin => coin.id === id);
    return this.isExistingId;
  }
}
