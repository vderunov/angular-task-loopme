import { Component } from '@angular/core';

import { RequestStateService } from '../../shared/request-state.service';
import { ISearchBySymbol } from './interfaces';


@Component({
  selector: 'app-search',
  templateUrl: './searchBySymbol.component.html',
  styleUrls: ['./searchBySymbol.component.scss']
})
export class SearchBySymbolComponent implements ISearchBySymbol {

  constructor(private requestStateService: RequestStateService) {
  }

  public searchValueEvent($event: any): void {
    const value: string = $event.target.value;

    if (value) {
      this.requestStateService.setState({symbols: value});
    } else {
      this.requestStateService.setState({symbols: false});
    }
  }
}


