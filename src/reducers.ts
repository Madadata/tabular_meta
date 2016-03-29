/// <reference path="../typings/main.d.ts" />
/// <reference path="./models.ts" />

import { Moment } from 'moment';
import { ColumnType, ColumnMeta, StringColumnMeta, NumberColumnMeta, DateTimeColumnMeta } from './models';

export interface MetaReducer<T extends ColumnMeta<any>> {
  (cell: string, acc: T): T | boolean;
}

export let stringReducer: MetaReducer<StringColumnMeta>;
stringReducer = function(cell: string, acc: StringColumnMeta = {
  type: ColumnType.String,
  maxLength: Number.NEGATIVE_INFINITY,
  minLength: Number.POSITIVE_INFINITY,
  values: []
}) {
  // in-place
  acc.values.push(cell);
  return {
    type: ColumnType.String,
    maxLength: Math.max(cell.length, acc.maxLength),
    minLength: Math.min(cell.length, acc.minLength),
    values: acc.values
  };
};

export let numberReducer: MetaReducer<NumberColumnMeta>;
numberReducer = function(cell: string, acc: NumberColumnMeta = {
  type: ColumnType.Number,
  maxValue: Number.NEGATIVE_INFINITY,
  minValue: Number.POSITIVE_INFINITY,
  values: []
}) {
  const val = parseFloat(cell);
  if (isFinite(val)) {
    acc.values.push(val);
    return {
      type: ColumnType.Number,
      maxValue: Math.max(val, acc.maxValue),
      minValue: Math.min(val, acc.minValue),
      values: acc.values
    };
  } else {
    return false;
  }
};

export let dateTimeReducer: MetaReducer<DateTimeColumnMeta>;
dateTimeReducer = function(cell: string, acc: DateTimeColumnMeta = {
  type: ColumnType.DateTime,
  hasDate: false,
  hasTime: false,
  values: []
}) {
  return false;
};
