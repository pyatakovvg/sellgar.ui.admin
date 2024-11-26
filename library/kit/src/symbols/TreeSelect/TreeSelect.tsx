import React from 'react';

import { Underlay } from '../Underlay';
import { DropDown } from '../_parts/DropDown';
import { SimpleSelectField } from '../_parts/SimpleSelectField';

import { List } from './List';

import { EMode, ESize } from '../../kit.types.ts';

import st from './default.module.scss';

export interface ISelectedValue<TOptionValue = string> {
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
  readonly optionSubItemsKey: keyof O;
  value: TOptionValue | null;
  onFocus?(value: TOptionValue | null): void;
  onChange(value: TOptionValue | null): void;
  onBlur?(value: TOptionValue | null): void;
}

const getValue = <O, TOptionValue>(
  options: O[],
  value: TOptionValue | null,
  optionKey: keyof O,
  optionValue: keyof O,
  optionSubItemsKey: keyof O,
): ISelectedValue<TOptionValue> | null => {
  for (const option of options) {
    if (option[optionKey] === value) {
      return {
        key: option[optionKey] as TOptionValue,
        value: option[optionValue] as TOptionValue,
      };
    }
    if (Array.isArray(option[optionSubItemsKey]) && option[optionSubItemsKey].length) {
      const result = getValue(option[optionSubItemsKey] as O[], value, optionKey, optionValue, optionSubItemsKey);

      if (!!result) {
        return result;
      }
    }
  }
  return null;
};

export const TreeSelect = <O, TOptionValue>(props: ISelect<O, TOptionValue>) => {
  const [isFocus, setFocus] = React.useState(false);

  const selectedValue = React.useMemo(() => {
    return getValue<O, TOptionValue>(
      props.options,
      props.value,
      props.optionKey,
      props.optionValue,
      props.optionSubItemsKey,
    );
  }, [props.options, props.value]);

  const handleChange = (value: TOptionValue | null) => {
    props.onChange(value);
  };

  return (
    <DropDown
      disabled={props.disabled || props.readOnly}
      onFocus={() => {
        console.log(123);
        setFocus(true);
      }}
      onBlur={() => setFocus(false)}
    >
      <DropDown.Content>
        <SimpleSelectField
          mode={props.mode}
          disabled={props.disabled}
          isClearable={props.isClearable}
          placeholder={props.placeholder}
          isFocus={isFocus}
          value={selectedValue?.value as string}
          onReset={() => handleChange(null)}
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
              optionSubItemsKey={props.optionSubItemsKey}
              onChange={handleChange}
            />
          </div>
        </Underlay>
      </DropDown.List>
    </DropDown>
  );
};
