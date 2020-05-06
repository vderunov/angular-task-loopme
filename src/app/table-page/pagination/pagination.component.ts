import { Component } from '@angular/core';
import { IPaginationEvent } from '@loopme/uikit';
import { RequestStateService } from '../../shared/request-state.service';
import { IPaginationComponent } from './interfaces';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements IPaginationComponent {

  constructor(private requestStateService: RequestStateService) {
  }

  public onPageChange($event: IPaginationEvent) {
    const currentPage = $event.currentPage - 1;
    const itemsPerPage = $event.itemsPerPage;

    this.requestStateService.setState({limit: itemsPerPage, offset: itemsPerPage * currentPage});
  }
}
