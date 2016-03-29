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

export type ColumnMetaCollection = ColumnMeta<ValueType>[];

export interface TableMeta {
  columns: ColumnMetaCollection;
}
