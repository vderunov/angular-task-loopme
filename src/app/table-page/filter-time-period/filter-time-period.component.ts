import { Component } from '@angular/core';
import { RequestStateService } from '../../shared/request-state.service';
import { TimePeriod } from '../../shared/enums';
import { IFilterTimePeriod } from './interfaces';


@Component({
  selector: 'app-filter-time-period',
  templateUrl: './filter-time-period.component.html',
  styleUrls: ['./filter-time-period.component.scss']
})
export class FilterTimePeriodComponent implements IFilterTimePeriod {

  public timePeriod = TimePeriod;

  constructor(private requestStateService: RequestStateService) {
  }

  public changeHandler($event: any): any {
    const value: string = $event.target.value;
    this.requestStateService.setState({timePeriod: value});
  }

}
