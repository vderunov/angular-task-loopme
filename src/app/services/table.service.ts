import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { DefResponse, IState } from '../shared/interfaces';
import { RequestState } from '../table-page/request-state.model';
import { Currency, TimePeriod } from '../shared/enums';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TableService {
  private params: HttpParams;
  private requestState: RequestState = new RequestState(
    Currency.USD,
    TimePeriod.DAY,
    0,
    15,
    'desc',
  );

  constructor(private http: HttpClient) {}

  public getCoins(state = {}): Observable<DefResponse> {
    this.setRequestState(state);
    return this.http.get<DefResponse>(`${environment.baseUrl}/coins?&${this.params}`);
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

  private setRequestState(newSettings: object): void {
    this.requestState = {
      ...this.requestState,
      ...newSettings,
    };
    this.setParams(this.requestState);
  }
}
