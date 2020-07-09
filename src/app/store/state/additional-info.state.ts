import { CoinsALLProp } from '../../shared/interfaces';
import { IData } from '../../info-page/line-chart/interfaces';


export interface IAdditionalInfoState {
  coin: CoinsALLProp;
  coinHistory: IData;
  errorId: Error | null | string;
  errorInfo: Error | null | string;
}

export const initialAdditionalInfoState: IAdditionalInfoState = {
  coin: null,
  coinHistory: null,
  errorId: null,
  errorInfo: null,
};
