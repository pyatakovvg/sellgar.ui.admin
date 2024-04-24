import React from 'react';

import { Text } from './Text';
import { Placeholder } from './Placeholder';

interface IProps {
  isFocused?: boolean;
  readOnly?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  mode?: string;
  placeholder?: string;
  optionKey: string;
  optionValue: string;
  options: any[];
  value: any;
  onReset: () => void;
}

export const Value = (props: IProps) => {
  if (props.value) {
    return <Text>{props.value.value}</Text>;
  }
  return <Placeholder />;
};
