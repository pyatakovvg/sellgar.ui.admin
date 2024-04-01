import React from 'react';

import { SimpleValue } from './SimpleValue';
import { Placeholder } from './Placeholder';

interface IValuesProps {
  value: string | null;
  format?: string;
  placeholder?: string;
  isUTC?: boolean;
  disabled?: boolean;
}

export const Values = (props: IValuesProps) => {
  if (!props.value) {
    return <Placeholder>{props?.placeholder ?? 'Select value...'}</Placeholder>;
  }
  return <SimpleValue disabled={props.disabled} value={props.value} format={props.format} />;
};
