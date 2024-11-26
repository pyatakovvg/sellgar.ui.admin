import React from 'react';

import { EMode } from '../../../kit.types.ts';
import { FieldWrapper } from '../FieldWrapper';

import { Icon } from '../../Icon';
import { Control } from './Control';

import cn from 'classnames';
import st from './default.module.scss';

export interface ISelect
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onFocus' | 'onChange' | 'onBlur'> {
  mode?: EMode;
  isFocus?: boolean;
  readOnly?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  value?: string | null;
  onFocus?(): void;
  onReset?(): void;
  onBlur?(): void;
}

export const SimpleSelectField = (props: ISelect) => {
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
          [st.focus]: props.isFocus,
          [st.disabled]: props.disabled,
          [st.readonly]: props.readOnly,
        },
        {
          [st['mode--danger']]: props.mode === EMode.DANGER,
        },
      ),
    [props.disabled, props.readOnly, props.mode, props.isFocus],
  );
  const resetClassName = React.useMemo(
    () =>
      cn(st.reset, {
        [st.focus]: props.isFocus,
        [st.disabled]: props.disabled,
      }),
    [props.disabled, props.isFocus],
  );
  const controlClassName = React.useMemo(
    () =>
      cn(st.control, {
        [st.focus]: props.isFocus,
        [st.disabled]: props.disabled,
        [st.readonly]: props.readOnly,
      }),
    [props.disabled, props.readOnly, props.isFocus],
  );

  const handleReset = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.disabled) {
      return void 0;
    }

    event.stopPropagation();
    props.onReset && props.onReset();
  };

  return (
    <FieldWrapper>
      <div className={wrapperClassName}>
        <Control
          readOnly={props.readOnly}
          disabled={props.disabled}
          placeholder={props.placeholder}
          value={props.value}
        />
        {hasReset && (
          <div className={resetClassName} onClick={handleReset}>
            <Icon icon={'clear'} size={12} />
          </div>
        )}
        <div className={controlClassName}>
          <Icon icon={props.isFocus ? 'arrow_drop_up' : 'arrow_drop_down'} size={20} />
        </div>
      </div>
    </FieldWrapper>
  );
};
