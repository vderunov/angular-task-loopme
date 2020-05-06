import { Component } from '@angular/core';
import { Informer } from '@loopme/uikit';
import { IErrorMessageComponent } from './interfaces';

enum InformerType {
  ERROR = 'error',
}


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements IErrorMessageComponent {

  public informers: Informer[] = [
    new Informer('This id does not exist', InformerType.ERROR),
  ];

  public onRemove(item: Informer): void {
    this.informers = this.informers.filter((informer: Informer) => informer !== item);
  }
}
