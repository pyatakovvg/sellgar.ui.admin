import React from 'react';

import { EMode } from '@/types';

export interface ITextarea extends React.PropsWithChildren<React.TextareaHTMLAttributes<HTMLTextAreaElement>> {
  mode?: (typeof EMode)[keyof typeof EMode];
  autoFocus?: boolean;
}
