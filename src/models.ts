/// <reference path="../typings/main.d.ts" />

import * as moment from "moment";

export type ValueType = number | string | moment.Moment;

export type ColumnType = "string" | "number" | "moment";

export interface ColumnMeta<T extends ValueType> {
  type: ColumnType;
  values: T[];
}

export const DefaultDateTimeFormats = [
  moment.ISO_8601,
  "YYYY-MM-DD",
  "DD-MM-YYYY",
  "MM-DD-YYYY",
  // Note for formats with time, only ISO_8601 is supported for now
];

export interface DateTimeColumnMeta extends ColumnMeta<moment.Moment> {
  dateTimeFormat?: string;
}

export interface StringColumnMeta extends ColumnMeta<string> {
  maxLength: number;
  minLength: number;
}

export interface NumberColumnMeta extends ColumnMeta<number> {
  minValue: number;
  maxValue: number;
}

export type ColumnMetaCollection = ColumnMeta<ValueType>[];

export interface TableMeta {
  headers: string[];
  columns: ColumnMetaCollection;
}
