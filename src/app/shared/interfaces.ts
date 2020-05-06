import { GridLink } from '@loopme/uikit';
import { Subject } from 'rxjs';

export interface IState {
  base: string;
  timePeriod: string;
  offset: number;
  limit: number;
  symbols?: string;
}

export interface CoinsALLProp {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconType: string;
  iconUrl: string;
  websiteUrl: string;
  socials: [];
  links: [];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: string;
  volume: number;
  marketCap: number;
  price: string;
  circulatingSupply: number;
  totalSupply: number;
  approvedSupply: boolean;
  firstSeen: number;
  change: number;
  rank: number;
  history: [];
  allTimeHigh: object;
  penalty: boolean;
}

export interface Coin {
  id: number;
  slug: string;
  symbol: string;
  name: GridLink;
  description: string;
  numberOfMarkets: number;
  numberOfExchanges: number;
  price: number;
  change: number;
}

export interface ICoinService {
  state: object;
  stream$: Subject<object>;

  setState(action: object): void;
}
