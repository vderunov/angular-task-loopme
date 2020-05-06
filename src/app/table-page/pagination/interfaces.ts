import { IPaginationEvent } from '@loopme/uikit';

export interface IPaginationComponent {

  onPageChange(event: IPaginationEvent): void;
}
