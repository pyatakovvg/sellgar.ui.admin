import React from 'react';

import { MultiValues } from './MultiValues';
import { SimpleValue } from './SimpleValue';
import { Placeholder } from './Placeholder';

import type { ISelectedValue, TOptionValue } from '../types';

interface IValuesProps {
  value: ISelectedValue | ISelectedValue[] | null;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onRemove(key: TOptionValue | null): void;
}

export const Values = (props: IValuesProps) => {
  if (props.value instanceof Array) {
    if (!props.value.length) {
      return <Placeholder>{props?.placeholder ?? 'Select value...'}</Placeholder>;
    }
    return (
      <MultiValues readOnly={props.readOnly} disabled={props.disabled} values={props.value} onRemove={props.onRemove} />
    );
  }
  if (!props.value) {
    return <Placeholder>{props?.placeholder ?? 'Select value...'}</Placeholder>;
  }
  return <SimpleValue disabled={props.disabled} value={props.value} />;
};
