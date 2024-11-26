import React from 'react';

import { Value } from './Value';
import { Placeholder } from './Placeholder';

import type { ISelectedValue } from '../SimpleSelect.tsx';

interface IValuesProps {
  value: ISelectedValue | null;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const Control = (props: IValuesProps) => {
  if (!props.value) {
    return <Placeholder>{props?.placeholder ?? 'Select value...'}</Placeholder>;
  }
  return <Value disabled={props.disabled} value={props.value} />;
};
