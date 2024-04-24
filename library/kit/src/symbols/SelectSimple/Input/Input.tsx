import React from 'react';

import { EMode } from '@/types';
import { Icon } from '@/symbols/Icon';

import { Value } from './Value';

import type { ISelectedValue } from '@/symbols/Select/types.tsx';
import type { TOptionValue } from '@/symbols/SelectedList/types.tsx';

import cn from 'classnames';
import s from './default.module.scss';

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
  onReset: () => void;
}

const getSimpleValue = <O extends Record<string, any> = {}>(
  options: readonly O[],
  value: any,
  optionKey: keyof O,
  optionValue: keyof O,
  isSimplify?: boolean,
): ISelectedValue | null => {
  const foundOption = options.find((option) => option[optionKey] === (isSimplify ? value : value[optionKey]));
  if (foundOption) {
    return {
      key: foundOption[optionKey],
      value: foundOption[optionValue],
    };
  }
  return null;
};

export const Input: React.FC<IProps> = (props) => {
  const [isFocus, setFocus] = React.useState(false);

  const wrapperClassName = React.useMemo(
    () =>
      cn(
        s.wrapper,
        {
          [s.focus]: isFocus,
          [s.disabled]: props.disabled,
          [s.readonly]: props.readOnly,
        },
        {
          [s['mode--danger']]: props.mode === EMode.DANGER,
        },
      ),
    [props.disabled, props.readOnly, props.mode, isFocus],
  );

  const controlClassName = React.useMemo(
    () =>
      cn(s.control, {
        [s.focus]: isFocus,
        [s.disabled]: props.disabled,
        [s.readonly]: props.readOnly,
      }),
    [props.disabled, props.readOnly, isFocus],
  );

  const selectedValue = React.useMemo(() => {
    return getSimpleValue(
      props.options,
      props.value as TOptionValue | null,
      props.optionKey,
      props.optionValue,
      props.isSimplify,
    );
  }, [props]);

  return (
    <div className={wrapperClassName}>
      <div className={s.content}>
        <Value
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
          optionKey={props.optionKey}
          optionValue={props.optionValue}
          options={props.options}
          value={selectedValue}
          onReset={props.onReset}
        />
      </div>
      <div className={controlClassName}>
        <Icon icon={'chevron-down'} />
      </div>
    </div>
  );
};
