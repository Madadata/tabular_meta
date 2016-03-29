/// <reference path="../typings/main.d.ts" />
/// <reference path="../src/models.ts" />

import {
  TableMeta,
  ColumnMeta,
  ValueType,
  ColumnType,
  ColumnMetaCollection,
} from './models';
import {
  MetaAndReducer,
  MetaReducer,
  metaInit
} from './reducers';
import * as _ from 'lodash';

interface ParseAcc {
  headers: String[];
  metaAndReducers: MetaAndReducer<any>[][];
}

function reduceCell(metaAndReducers: MetaAndReducer<any>[], cell: string): MetaAndReducer<any>[] | boolean {
  const retVal = _(metaAndReducers).map(metaAndReducer => {
    const meta = metaAndReducer.meta;
    const reducer = metaAndReducer.reducer;
    console.log(meta, reducer);
    const newMeta = reducer(meta, cell);
    if (newMeta) {
      return {
        meta: newMeta,
        reducer: reducer
      };
    } else {
      return null;
    }
  })
  .filter(_.identity)
  .value();
  if (_.isEmpty(retVal)) {
    return false;
  }
  return retVal;
}

function reduceRow(acc: ParseAcc, row: string[], index: number): ParseAcc | boolean {
  if (row.length !== acc.headers.length) {
    throw new Error(`there are ${acc.headers.length} headers but got ${row.length} cells at row ${index + 1}`);
  }
  const newMeta = _.zipWith(acc.metaAndReducers, row, reduceCell);
  if (_.every(newMeta)) {
    // NOTE in-place
    return _.merge(acc, { metaAndReducers: newMeta });
  } else {
    return false;
  }
}

export function parseTableMeta(data: string[][]): TableMeta {
  if (data.length < 2) {
    // we should expect header and at least one row
    throw new Error(`input should not be empty ${data}`);
  }
  const headers: string[] = _.head(data);
  const rest: string[][] = _.tail(data);
  const init: ParseAcc = {
    headers: headers,
    metaAndReducers: headers.map(i => metaInit())
  };
  const result = _.reduce(rest, reduceRow, init);
  return {
    columns: []
  };
}
