import React from 'react';
import { EMode } from '@/types';

export type TOptionValue = string | number;

export interface ISelectedValue {
  key: TOptionValue;
  value: TOptionValue;
}

export interface ISelect<O> extends React.PropsWithChildren {
  mode?: (typeof EMode)[keyof typeof EMode];
  name?: string;
  readOnly?: boolean;
  disabled?: boolean;
  optionKey: keyof O;
  optionValue: keyof O;
  value: TOptionValue | TOptionValue[] | null;
  options: readonly O[];
  isMultiselect?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  onChange(value: TOptionValue | TOptionValue[] | null): void;
}
