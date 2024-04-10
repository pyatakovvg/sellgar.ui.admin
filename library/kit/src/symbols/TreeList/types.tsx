import React from 'react';

export type TOptionValue = string | number;

interface ITreeListProps<O = {}> {
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

export interface ITreeList<O extends Record<string, any>> extends React.PropsWithChildren<ITreeListProps<O>> {}
