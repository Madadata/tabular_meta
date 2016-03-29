/// <reference path="../typings/main.d.ts" />
import { Moment } from 'moment';

export type ValueType = number | string | Moment;

export enum ColumnType {
  DateTime,
  String,
  Number
}

export interface ColumnMeta<T extends ValueType> {
  type: ColumnType;
  header?: string;
  values: T[];
}

export interface DateTimeColumnMeta extends ColumnMeta<Moment> {
  hasDate: boolean;
  hasTime: boolean;
}

export interface StringColumnMeta extends ColumnMeta<string> {
  maxLength: number;
  minLength: number;
}

export interface NumberColumnMeta extends ColumnMeta<number> {
  minValue: number;
  maxValue: number;
}

export interface ColumnMetaCollection {
  stringMeta?: StringColumnMeta;
  dateTimeMeta?: DateTimeColumnMeta;
  numberMeta?: NumberColumnMeta;
}

export interface TableMeta {
  columns: ColumnMeta<ValueType>[];
}
