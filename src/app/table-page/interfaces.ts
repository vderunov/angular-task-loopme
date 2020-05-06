import { TablePageData } from './table-page-data';

export interface ITableComponent {
  dataPrimitives: TablePageData;
  settingsPrimitives: TablePageData;

  createCoins(coins: any): void;

  getActionGrid(event: any): void;
}
