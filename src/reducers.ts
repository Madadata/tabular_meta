/// <reference path="../typings/main.d.ts" />
/// <reference path="../src/models.ts" />

import * as _ from 'lodash';
import {
  ColumnType,
  ColumnMeta,
  StringColumnMeta,
  NumberColumnMeta,
  DateTimeColumnMeta,
  ColumnMetaCollection
} from './models';

export interface MetaReducer<T extends ColumnMeta<any>> {
  (acc: T, cell: string): T | boolean;
}

export type MetaAndReducer<T extends ColumnMeta<T>> = {
  meta: T;
  reducer: MetaReducer<T>;
}

const stringReducerInitialValue: StringColumnMeta = Object.freeze({
  type: ColumnType.String,
  maxLength: Number.NEGATIVE_INFINITY,
  minLength: Number.POSITIVE_INFINITY,
  values: []
});

export let stringReducer: MetaReducer<StringColumnMeta>;
stringReducer = function(acc: StringColumnMeta, cell: string) {
  // NOTE: in-place
  acc.values.push(cell);
  return {
    type: ColumnType.String,
    maxLength: Math.max(cell.length, acc.maxLength),
    minLength: Math.min(cell.length, acc.minLength),
    values: acc.values
  };
};

const numberReducerIntialValue: NumberColumnMeta = Object.freeze({
  type: ColumnType.Number,
  maxValue: Number.NEGATIVE_INFINITY,
  minValue: Number.POSITIVE_INFINITY,
  values: []
});

export let numberReducer: MetaReducer<NumberColumnMeta>;
numberReducer = function(acc: NumberColumnMeta, cell: string) {
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
    console.warn('number cell', cell);
    return false;
  }
};

const dateTimeReducerIntialValue: DateTimeColumnMeta = Object.freeze({
  type: ColumnType.DateTime,
  hasDate: false,
  hasTime: false,
  values: []
});

export let dateTimeReducer: MetaReducer<DateTimeColumnMeta>;
dateTimeReducer = function(acc: DateTimeColumnMeta, cell: string) {
  console.warn('datetime cell', cell);
  return false;
};

export function metaInit(): MetaAndReducer<any>[] {
  return _.cloneDeep([
    { meta: stringReducerInitialValue, reducer: stringReducer },
    { meta: dateTimeReducerIntialValue, reducer: dateTimeReducer },
    { meta: numberReducerIntialValue, reducer: numberReducer },
  ]);
};
