import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IData } from '../info-page/line-chart/interfaces';
import { IdCoinResp } from '../shared/interfaces';


@Injectable({
  providedIn: 'root',
})
export class AdditionalInfoService {
  constructor(private http: HttpClient) { }

  public fetchCoinHistory({ coinId, timeFrame = '30d', currency = 'USD' }): Observable<IData | object> {
    return this.http.get<Observable<IData>>(`${environment.baseUrl}/coin/${coinId}/history/${timeFrame}?base=${currency}`);
  }

  public getById(id: number): Observable<IdCoinResp> {
    return this.http.get<IdCoinResp>(`${environment.baseUrl}/coin/${id}`);
  }
}
