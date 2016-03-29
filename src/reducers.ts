/// <reference path="../typings/main.d.ts" />
/// <reference path="../src/models.ts" />

import { Moment } from 'moment';
import {
  ColumnType,
  ColumnMeta,
  StringColumnMeta,
  NumberColumnMeta,
  DateTimeColumnMeta, ColumnMetaCollection
} from './models';

export interface MetaReducer<T extends ColumnMeta<any>> {
  (cell: string, acc: T): T | boolean;
}

const stringReducerInitialValue: StringColumnMeta = {
  type: ColumnType.String,
  maxLength: Number.NEGATIVE_INFINITY,
  minLength: Number.POSITIVE_INFINITY,
  values: []
};

export let stringReducer: MetaReducer<StringColumnMeta>;
stringReducer = function(cell: string, acc: StringColumnMeta) {
  // NOTE: in-place
  acc.values.push(cell);
  return {
    type: ColumnType.String,
    maxLength: Math.max(cell.length, acc.maxLength),
    minLength: Math.min(cell.length, acc.minLength),
    values: acc.values
  };
};

const numberReducerIntialValue: NumberColumnMeta = {
  type: ColumnType.Number,
  maxValue: Number.NEGATIVE_INFINITY,
  minValue: Number.POSITIVE_INFINITY,
  values: []
};

export let numberReducer: MetaReducer<NumberColumnMeta>;
numberReducer = function(cell: string, acc: NumberColumnMeta) {
  const val = parseFloat(cell);
  if (isFinite(val)) {
    // NOTE: in-place
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

const dateTimeReducerIntialValue: DateTimeColumnMeta = {
  type: ColumnType.DateTime,
  hasDate: false,
  hasTime: false,
  values: []
};

export let dateTimeReducer: MetaReducer<DateTimeColumnMeta>;
dateTimeReducer = function(cell: string, acc: DateTimeColumnMeta) {
  return false;
};

export const metaInit: ColumnMetaCollection = {
  stringMeta: stringReducerInitialValue,
  numberMeta: numberReducerIntialValue,
  dateTimeMeta: dateTimeReducerIntialValue
};