import { CoinsALLProp } from '../../shared/interfaces';
import { IData } from '../../info-page/line-chart/interfaces';


export interface IAdditionalInfoState {
  coin: CoinsALLProp;
  coinHistory: IData;
  error: Error | null | string;
}

export const initialAdditionalInfoState: IAdditionalInfoState = {
  coin: null,
  coinHistory: null,
  error: null,
};
