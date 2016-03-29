/// <reference path="../typings/main.d.ts" />
/// <reference path="./models.ts" />

import { TableMeta } from './models';

export function parseTableMeta(data: String[][]): TableMeta {
  if (data.length === 0){
    throw new Error(`input should not be empty ${data}`);
  }
  const header = data[0];
  for (const row of data) {
    console.log(row);
  }
  return {
    columns: []
  };
}
