/// <reference path="../typings/main.d.ts" />
/// <reference path="../src/models.ts" />

import {
  TableMeta,
  ColumnMeta,
  ValueType,
  ColumnMetaCollection,
} from './models';
import {
  stringReducer,
  numberReducer,
  dateTimeReducer,
  metaInit
} from './reducers';
import { chain } from 'lodash';

function collectiveReducer(cell: string, meta: ColumnMetaCollection = metaInit): ColumnMetaCollection | boolean {
  return false;
}

export function parseTableMeta(data: String[][]): TableMeta {
  if (data.length < 2) {
    // we should expect header and at least one row
    throw new Error(`input should not be empty ${data}`);
  }
  const header = data[0];
  const result = chain(data).tail().reduce(collectiveReducer).value();
  return {
    columns: result
  };
}
