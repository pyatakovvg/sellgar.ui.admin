import React from 'react';

export type TOptionValue = string | number;

interface ISelectedListProps<O extends Record<string, any>> {
  className?: string;
  name?: string;
  disabled?: boolean;
  optionKey: keyof O;
  optionValue: keyof O;
  value: TOptionValue | TOptionValue[] | null;
  options: readonly O[];
  isMultiselect?: boolean;
  onChange(value: TOptionValue | TOptionValue[]): void;
}

export interface ISelectedList<O extends Record<string, any>> extends React.PropsWithChildren<ISelectedListProps<O>> {}
