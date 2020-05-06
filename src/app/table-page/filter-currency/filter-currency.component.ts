import { Component } from '@angular/core';
import { RequestStateService } from '../../shared/request-state.service';
import { IFilterCurrency } from './interfaces';
import { Currency } from '../../shared/enums';


@Component({
  selector: 'app-filter-currency',
  templateUrl: './filter-currency.component.html',
  styleUrls: ['./filter-currency.component.scss']
})
export class FilterCurrencyComponent implements IFilterCurrency {

  public currency = Currency;

  constructor(private requestStateService: RequestStateService) {
  }

  public changeHandler($event: any): any {
    const value: string = $event.target.value;
    this.requestStateService.setState({base: value});
  }
}
