import React from 'react';

import { Icon } from '@/symbols/Icon';

import { EMode, ESize, EVariant } from '@/types';

export interface IButton extends React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  size?: (typeof ESize)[keyof typeof ESize];
  variant?: (typeof EVariant)[keyof typeof EVariant];
  mode?: (typeof EMode)[keyof typeof EMode];
  leftIcon?: React.ReactElement<typeof Icon>;
  rightIcon?: React.ReactElement<typeof Icon>;
  inProcess?: boolean;
}
