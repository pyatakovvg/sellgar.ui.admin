import React from 'react';

export interface ICheckbox extends React.PropsWithChildren<Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'>> {
  value: boolean;
}
