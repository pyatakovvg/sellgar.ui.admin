import React from 'react';

import { Value } from './Value';
import { Placeholder } from './Placeholder';

interface IValuesProps {
  value?: string | null;
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
