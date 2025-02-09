import React from 'react';

import { EMode, ESize } from '../../kit.types.ts';

import { Underlay } from '../Underlay';
import { DropDown } from '../_parts/DropDown';
import { SimpleSelectField } from '../_parts/SimpleSelectField';

import { List } from './List';

import st from './default.module.scss';

export interface ISelectedValue<TOptionValue = any> {
  key: TOptionValue;
  value: TOptionValue;
}

export interface ISelect<O, TOptionValue>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onFocus' | 'onChange' | 'onBlur'> {
  mode?: EMode;
  readOnly?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  readonly name?: string;
  readonly optionKey: keyof O;
  readonly optionValue: keyof O;
  readonly options: O[];
  value: TOptionValue | null;
  onFocus?(value: TOptionValue | null): void;
  onChange?(value: TOptionValue | null): void;
  onBlur?(value: TOptionValue | null): void;
}

const getValue = <O, TOptionValue>(
  options: readonly O[],
  value: TOptionValue | null,
  optionKey: keyof O,
  optionValue: keyof O,
): ISelectedValue<TOptionValue> | null => {
  const foundOption = options.find((option) => option[optionKey] === value);
  if (foundOption) {
    return {
      key: foundOption[optionKey] as TOptionValue,
      value: foundOption[optionValue] as TOptionValue,
    };
  }
  return null;
};

export const SimpleSelect = <O, TOptionValue>(props: ISelect<O, TOptionValue>) => {
  const [isFocus, setFocus] = React.useState(false);

  const selectedValue = React.useMemo(() => {
    return getValue<O, TOptionValue>(props.options, props.value, props.optionKey, props.optionValue);
  }, [props.options, props.value]);

  const handleChange = (value: TOptionValue | null) => {
    props.onChange && props.onChange(value);
  };

  const handleReset = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onChange && props.onChange(null);
  };

  return (
    <DropDown disabled={props.disabled || props.readOnly} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <DropDown.Content>
        <SimpleSelectField
          mode={props.mode}
          disabled={props.disabled}
          isClearable={props.isClearable}
          placeholder={props.placeholder}
          isFocus={isFocus}
          value={selectedValue?.value as string}
          onReset={() => handleReset()}
        />
      </DropDown.Content>
      <DropDown.List>
        <Underlay size={ESize.MD}>
          <div className={st.content}>
            <List
              value={props.value}
              optionKey={props.optionKey}
              optionValue={props.optionValue}
              options={props.options}
              onChange={handleChange}
            />
          </div>
        </Underlay>
      </DropDown.List>
    </DropDown>
  );
};
