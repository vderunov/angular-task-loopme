import { ICoinALLProp } from '../../models/coin.interface';

export interface ITableState {
  coins: ICoinALLProp[];
}

export const initialTableState: ITableState = {
  coins: null,
};
