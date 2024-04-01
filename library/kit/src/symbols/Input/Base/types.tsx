import React from 'react';

import { EMode } from '@/types';

export interface IInput extends React.PropsWithChildren<React.InputHTMLAttributes<HTMLInputElement>> {
  mode?: (typeof EMode)[keyof typeof EMode];
  type?: 'email' | 'password';
  autoFocus?: boolean;
}
