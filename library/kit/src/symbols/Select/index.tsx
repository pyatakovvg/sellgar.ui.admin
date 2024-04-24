import React from 'react';

import { EMode } from '@/types';
import { DropDown } from '@/base/DropDown';

import { Icon } from '../Icon';
import { Values } from './Values';
import { SelectedList } from '../SelectedList';

import type { ISelect, ISelectedValue } from './types';
import type { TOptionValue } from '../SelectedList/types';

import cn from 'classnames';
import st from './default.module.scss';

const getMultiValues = <O extends Record<string, any> = {}>(
  options: readonly O[],
  values: TOptionValue[],
  optionKey: keyof O,
  optionValue: keyof O,
): ISelectedValue[] => {
  const foundOptions = options.filter((option) => values.some((value) => value === option[optionKey]));
  if (foundOptions.length) {
    return foundOptions.map((option) => ({
      key: option[optionKey],
      value: option[optionValue],
    }));
  }
  return [];
};

const getSimpleValue = <O extends Record<string, any> = {}>(
  options: readonly O[],
  value: TOptionValue | null,
  optionKey: keyof O,
  optionValue: keyof O,
): ISelectedValue | null => {
  const foundOption = options.find((option) => option[optionKey] === value);
  if (foundOption) {
    return {
      key: foundOption[optionKey],
      value: foundOption[optionValue],
    };
  }
  return null;
};

export const Select = <O extends Record<string, any> = {}>({ name, ...props }: ISelect<O>) => {
  const [isFocus, setFocus] = React.useState(false);
  const hasReset = React.useMemo(() => {
    if (!props.isClearable || props.readOnly) {
      return false;
    }
    if (props.isMultiselect) {
      if (props.value instanceof Array) {
        return !!props.value.length;
      }
    }
    return !!props.value;
  }, [props.value, props.isMultiselect, props.isClearable, props.readOnly]);

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
    if (props.isMultiselect) {
      return getMultiValues<O>(props.options, props.value as TOptionValue[], props.optionKey, props.optionValue);
    }
    return getSimpleValue<O>(props.options, props.value as TOptionValue | null, props.optionKey, props.optionValue);
  }, [props]);

  const handleChange = (value: TOptionValue | TOptionValue[]) => {
    props.onChange(value);
  };

  const handleRemove = (key: TOptionValue) => {
    if (props.isMultiselect) {
      if (props.value instanceof Array) {
        const index = props.value.indexOf(key as any);
        if (index >= 0) {
          props.onChange([...props.value.slice(0, index), ...props.value.slice(index + 1)]);
        }
      }
    }
  };

  const handleReset = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (props.disabled) {
      return void 0;
    }
    if (props.isMultiselect) {
      props.onChange([]);
      return void 0;
    }
    props.onChange(null);
  };

  return (
    <DropDown disabled={props.disabled || props.readOnly} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <DropDown.Content>
        <div className={wrapperClassName}>
          <Values
            readOnly={props.readOnly}
            disabled={props.disabled}
            placeholder={props.placeholder}
            value={selectedValue}
            onRemove={handleRemove}
          />
          {hasReset && (
            <div className={resetClassName} onClick={handleReset}>
              <Icon icon={'xmark'} />
            </div>
          )}
          <div className={controlClassName}>
            <Icon icon={'chevron-down'} />
          </div>
        </div>
      </DropDown.Content>
      <DropDown.List>
        <div className={st.content}>
          <SelectedList {...props} name={name} onChange={handleChange} />
        </div>
      </DropDown.List>
    </DropDown>
  );
};
