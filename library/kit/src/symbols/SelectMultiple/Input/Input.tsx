import React from 'react';

import { EMode } from '@/types';
import { Icon } from '@/symbols/Icon';
import { Values } from './Values';

import cn from 'classnames';
import st from './default.module.scss';

interface IProps<T = any> {
  readOnly?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  mode?: string;
  placeholder?: string;
  optionKey: keyof T;
  optionValue: keyof T;
  options: T[];
  value: T[];
  onReset: () => void;
  onRemove: (key: any) => void;
}

const getMultiValues = <O extends Record<string, any> = {}>(
  options: readonly O[],
  values: O[],
  optionKey: keyof O,
  optionValue: keyof O,
): any[] => {
  const foundOptions = options.filter((option) => values.some((value) => value[optionKey] === option[optionKey]));
  if (foundOptions.length) {
    return foundOptions.map((option) => ({
      key: option[optionKey],
      value: option[optionValue],
    }));
  }
  return [];
};

export const Input: React.FC<IProps> = (props) => {
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
    return getMultiValues(props.options, props.value as any, props.optionKey, props.optionValue);
  }, [props]);

  return (
    <div className={wrapperClassName}>
      <Values
        readOnly={props.readOnly}
        disabled={props.disabled}
        placeholder={props.placeholder}
        values={selectedValue}
        onRemove={props.onRemove}
      />
      {hasReset && (
        <div className={resetClassName} onClick={props.onReset}>
          <Icon icon={'xmark'} />
        </div>
      )}
      <div className={controlClassName}>
        <Icon icon={'chevron-down'} />
      </div>
    </div>
  );
};
