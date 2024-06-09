import React from 'react';

interface IDropDownProps {
  alignStart?: 'start' | 'end';
  disabled?: boolean;
  onFocus?(): void;
  onBlur?(): void;
}

export interface IDropDown extends React.PropsWithChildren<IDropDownProps> {}
