/// <reference path="../typings/main.d.ts" />
/// <reference path="../src/models.ts" />

import * as _ from "lodash";
import {
  ColumnType,
  ColumnMeta,
  StringColumnMeta,
  NumberColumnMeta,
  DateTimeColumnMeta,
  ColumnMetaCollection
} from "./models";

export interface MetaReducer<T extends ColumnMeta<any>> {
  (acc: T, cell: string): T | boolean;
}

export type MetaAndReducer<T extends ColumnMeta<T>> = {
  meta: T;
  reducer: MetaReducer<T>;
}

const stringReducerInitialValue: StringColumnMeta = {
  type: "string",
  maxLength: Number.NEGATIVE_INFINITY,
  minLength: Number.POSITIVE_INFINITY,
  values: []
};

export let stringReducer: MetaReducer<StringColumnMeta>;
stringReducer = function(acc: StringColumnMeta, cell: string) {
  // NOTE: in-place
  acc.values.push(cell);
  return {
    type: acc.type,
    maxLength: Math.max(cell.length, acc.maxLength),
    minLength: Math.min(cell.length, acc.minLength),
    values: acc.values
  };
};

const numberReducerIntialValue: NumberColumnMeta = {
  type: "number",
  maxValue: Number.NEGATIVE_INFINITY,
  minValue: Number.POSITIVE_INFINITY,
  values: []
};

export let numberReducer: MetaReducer<NumberColumnMeta>;
numberReducer = function(acc: NumberColumnMeta, cell: string) {
  const val = parseFloat(cell);
  if (isFinite(val)) {
    // NOTE: in-place
    acc.values.push(val);
    return {
      type: acc.type,
      maxValue: Math.max(val, acc.maxValue),
      minValue: Math.min(val, acc.minValue),
      values: acc.values
    };
  } else {
    return false;
  }
};

const dateTimeReducerIntialValue: DateTimeColumnMeta = {
  type: "dateTime",
  hasDate: false,
  hasTime: false,
  values: []
};

export let dateTimeReducer: MetaReducer<DateTimeColumnMeta>;
dateTimeReducer = function(acc: DateTimeColumnMeta, cell: string) {
  return false;
};

export function metaInit(): MetaAndReducer<any>[] {
  // NOTE that this order is important, the most safe-bet ones come first and will
  // be override by subsequence ones
  return _.cloneDeep([
    {
      meta: stringReducerInitialValue,
      reducer: stringReducer
    },
    {
      meta: numberReducerIntialValue,
      reducer: numberReducer
    },
    {
      meta: dateTimeReducerIntialValue,
      reducer: dateTimeReducer
    },
  ]);
};
