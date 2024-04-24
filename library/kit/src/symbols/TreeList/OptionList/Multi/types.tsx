import React from 'react';

export type TOptionValue = string | number | boolean;

interface IOptionProps {
  isShowControl: boolean;
  value: TOptionValue | TOptionValue[] | null;
  currentValue: TOptionValue;
  onClick(): void;
}

export interface IOptionList extends React.PropsWithChildren<IOptionProps> {}
