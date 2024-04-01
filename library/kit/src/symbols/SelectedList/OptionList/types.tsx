import React from 'react';

export type TOptionValue = string | number;

interface IOptionProps {
  isMultiple?: boolean;
  value: TOptionValue | TOptionValue[] | null;
  currentValue: TOptionValue;
  onClick(): void;
}

export interface IOptionList extends React.PropsWithChildren<IOptionProps> {}
