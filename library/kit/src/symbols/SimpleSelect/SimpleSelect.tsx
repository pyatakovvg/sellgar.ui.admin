import React from 'react';

import { EMode } from '../../kit.types.ts';
import { DropDown } from '../_parts/DropDown';
import { FieldWrapper } from '../_parts/FieldWrapper';
import { SimpleSelectField } from '../_parts/SimpleSelectField';

import { Icon } from '../Icon';
import { Control } from './Control';
import { SimpleSelectedList } from '../SimpleSelectedList';

import cn from 'classnames';
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
  readonly options: readonly O[];
  value: TOptionValue | null;
  onFocus?(value: TOptionValue | null): void;
  onChange(value: TOptionValue | null): void;
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
  const hasReset = React.useMemo(() => {
    if (!props.isClearable || props.readOnly) {
      return false;
    }
    return !!props.value;
  }, [props.value, props.isClearable, props.readOnly]);

  const wrapperClassName = React.useMemo(
    () =>
      cn(
        st.wrapper,
        {
          [st.focus]: isFocus,
          [st.disabled]: props.disabled,
          [st.readonly]: props.readOnly,
        },
        {
          [st['mode--danger']]: props.mode === EMode.DANGER,
        },
      ),
    [props.disabled, props.readOnly, props.mode, isFocus],
  );
  const resetClassName = React.useMemo(
    () =>
      cn(st.reset, {
        [st.focus]: isFocus,
        [st.disabled]: props.disabled,
      }),
    [props.disabled, isFocus],
  );
  const controlClassName = React.useMemo(
    () =>
      cn(st.control, {
        [st.focus]: isFocus,
        [st.disabled]: props.disabled,
        [st.readonly]: props.readOnly,
      }),
    [props.disabled, props.readOnly, isFocus],
  );

  const selectedValue = React.useMemo(() => {
    return getValue<O, TOptionValue>(props.options, props.value, props.optionKey, props.optionValue);
  }, [props.options, props.value]);

  const handleChange = (value: TOptionValue | null) => {
    props.onChange(value);
  };

  const handleReset = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.disabled) {
      return void 0;
    }

    event.stopPropagation();
    props.onChange(null);
  };

  return (
    <DropDown disabled={props.disabled || props.readOnly} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <DropDown.Content>
        <SimpleSelectField value={selectedValue?.value} onChange={props.onChange} />
      </DropDown.Content>
      <DropDown.List>
        <div className={st.content}>
          <SimpleSelectedList
            value={props.value}
            optionKey={props.optionKey}
            optionValue={props.optionValue}
            options={props.options}
            onChange={handleChange}
          />
        </div>
      </DropDown.List>
    </DropDown>
  );
};
