import React from 'react';
import { EMode } from '@/types';

export type TOptionValue = string | number;

export interface ISelectedValue {
  key: TOptionValue;
  value: TOptionValue;
}

export interface ISelect<O = any> extends React.PropsWithChildren {
  mode?: (typeof EMode)[keyof typeof EMode];
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  optionKey: keyof O;
  optionValue: keyof O;
  value: O[keyof O] | O[keyof O][] | null;
  options: readonly O[];
  isMultiselect?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  onChange(value: TOptionValue | TOptionValue[] | null): void;
}
