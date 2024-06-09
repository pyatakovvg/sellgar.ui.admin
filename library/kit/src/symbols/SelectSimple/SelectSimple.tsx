import React from 'react';

import { DropDown } from '@/base/DropDown';

import { Input } from './Input';
import { Options } from './Options';

interface IProps {
  readOnly?: boolean;
  isClearable?: boolean;
  isSimplify?: boolean;
  disabled?: boolean;
  mode?: string;
  placeholder?: string;
  optionKey: string;
  optionValue: string;
  options: any[];
  value: any;
  onChange: (value: any) => void;
}

export const SelectSimple: React.FC<IProps> = (props) => {
  const handleReset = () => {
    props.onChange(null);
  };

  return (
    <DropDown>
      <DropDown.Content>
        <Input
          isSimplify={props.isSimplify}
          mode={props.mode}
          readOnly={props.readOnly}
          isClearable={props.isClearable}
          disabled={props.disabled}
          placeholder={props.placeholder}
          optionKey={props.optionKey}
          optionValue={props.optionValue}
          options={props.options}
          value={props.value}
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
