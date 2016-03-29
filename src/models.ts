/// <reference path="../typings/main.d.ts" />

export enum RowType {
  Boolean,
  Enumeration,
  String,
  Integral,
  Numeric
}

export interface ColumnInfo {
  type: RowType;
  header?: string;
}
