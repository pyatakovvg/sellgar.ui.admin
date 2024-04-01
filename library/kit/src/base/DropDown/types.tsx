import React from 'react';

interface IDropDownProps {
  disabled?: boolean;
  onFocus?(): void;
  onBlur?(): void;
}

export interface IDropDown extends React.PropsWithChildren<IDropDownProps> {}
