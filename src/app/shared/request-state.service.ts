import { Injectable } from '@angular/core';
import { CoinService } from './coin.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Currency, TimePeriod } from './enums';
import { ICoinService, IState } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestStateService implements ICoinService {

  public state: IState = {
    base: Currency.USD,
    timePeriod: TimePeriod.DAY,
    offset: 0,
    limit: 15,
  };

  public stream$: Subject<object> = new Subject<object>();

  constructor(private coinService: CoinService) {
    this.stream$
      .pipe(
        debounceTime(1000),
      ).subscribe((state: IState) => {
      this.coinService.fetchData(state);
    });
    this.stream$.next(this.state);
  }

  public setState(action: object): void {
    this.state = {
      ...this.state,
      ...action
    };
    this.stream$.next(this.state);
  }
}
