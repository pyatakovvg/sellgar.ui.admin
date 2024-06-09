import React from 'react';

import { DropDown } from '@/base/DropDown';

import { Input } from './Input';
import { Options } from './Options';

interface IProps<T = any> {
  readOnly?: boolean;
  isSimplify?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  mode?: string;
  placeholder?: string;
  optionKey: keyof T;
  optionValue: keyof T;
  options: T[];
  value: T[];
  onChange: (value: T) => void;
}

export const SelectMultiple: React.FC<IProps> = (props) => {
  const handleReset = () => {
    props.onChange([]);
  };

  const handleRemove = (key: any) => {
    const index = props.value.findIndex((item) => (props.isSimplify ? item : item[props.optionKey]) === key);
    if (index >= 0) {
      props.onChange([...props.value.slice(0, index), ...props.value.slice(index + 1)]);
    }
  };

  return (
    <DropDown>
      <DropDown.Content>
        <Input
          mode={props.mode}
          readOnly={props.readOnly}
          isSimplify={props.isSimplify}
          isClearable={props.isClearable}
          disabled={props.disabled}
          placeholder={props.placeholder}
          optionKey={props.optionKey}
          optionValue={props.optionValue}
          options={props.options}
          value={props.value}
          onRemove={handleRemove}
          onReset={handleReset}
        />
      </DropDown.Content>
      <DropDown.List>
        <Options
          isSimplify={props.isSimplify}
          optionKey={props.optionKey}
          optionValue={props.optionValue}
          options={props.options}
          value={props.value}
          onChange={props.onChange}
        />
      </DropDown.List>
    </DropDown>
  );
};
