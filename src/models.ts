/// <reference path="../typings/main.d.ts" />
import { Moment } from 'moment';

export enum ColumnType {
  DateTime,
  String,
  Number
}

export interface ColumnMeta<T> {
  type: ColumnType;
  header?: string;
  values: T[]
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

export interface TableMeta {
  columns: ColumnMeta<any>[];
}
