import { Informer } from '@loopme/uikit';

export interface IErrorMessageComponent {
  informers: Informer[];

  onRemove(item: Informer): void;
}
