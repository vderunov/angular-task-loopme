import { Component, OnInit } from '@angular/core';
import { RequestStateService } from '../../shared/request-state.service';
import { ISearchBySymbol } from './interfaces';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-search',
  templateUrl: './searchBySymbol.component.html',
  styleUrls: ['./searchBySymbol.component.scss']
})
export class SearchBySymbolComponent implements OnInit, ISearchBySymbol {

  private stream$: Subject<string> = new Subject<string>();

  constructor(private requestStateService: RequestStateService) {
  }

  ngOnInit(): void {
    this.stream$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(value => {
      if (value) {
        this.requestStateService.setState({symbols: value});
      } else {
        this.requestStateService.setState({symbols: false});
      }
    });
  }

  public searchValueEvent($event: any) {
    this.stream$.next($event.target.value);
  }
}


