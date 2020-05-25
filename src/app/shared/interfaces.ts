import { GridLink } from '@loopme/uikit';

export interface IState {
  base: string;
  timePeriod: string;
  offset: number;
  limit: number;
  order: string;
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

export interface DefResponse {
  status: string;
  data: {
    stats: object;
    base: object;
    coins: [];
  };
}

export interface IdCoinResp {
  status: string;
  data: {
    base: object;
    coin: CoinsALLProp;
  };
}
