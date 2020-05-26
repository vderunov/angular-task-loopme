import { CellType, IHeaderItem } from '@loopme/uikit';

export class TablePageData {
  public static settingsPrimitives = {
    headers: [
      { key: 'name', name: 'name', optional: true, sortable: false, type: CellType.LINK_ACTION, sort: 'none' } as IHeaderItem,
      { key: 'slug', name: 'slug', sortable: false, type: CellType.TEXT, width: 'auto' } as IHeaderItem,
      { key: 'symbol', name: 'symbol', sortable: false, type: CellType.TEXT, width: 'auto' } as IHeaderItem,
      { key: 'price', name: 'price', sortable: true, type: CellType.DECIMAL_NUMBER, width: 'auto' } as IHeaderItem,
      { key: 'description', name: 'description', sortable: false, type: CellType.TEXT, width: 'auto' } as IHeaderItem,
      { key: 'numberOfMarkets', name: 'number Of Markets', sortable: false, type: CellType.NUMBER, width: 'auto' } as IHeaderItem,
      { key: 'numberOfExchanges', name: 'number Of Exchanges', sortable: false, type: CellType.NUMBER, width: 'auto' } as IHeaderItem,
      { key: 'change', name: 'change', sortable: false, type: CellType.DECIMAL_NUMBER, width: 'auto' } as IHeaderItem
    ]
  };
  public static dataPrimitives = [];
}
