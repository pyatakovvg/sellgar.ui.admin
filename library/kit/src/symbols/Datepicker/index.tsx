import React from 'react';

import { Icon } from '../Icon';
import { Values } from './Values';

import { EMode } from '@/types';
import { Calendar } from '@/symbols/Calendar';
import { DropDown, events as dropDownEvents } from '@/base/DropDown';

import type { IDatepicker } from './types';

import cn from 'classnames';
import st from './default.module.scss';

export const Datepicker = React.forwardRef<HTMLDivElement, IDatepicker>((props, ref) => {
  const [isFocus, setFocus] = React.useState(false);
  const hasReset = React.useMemo(() => {
    if (!props.isClearable || props.readOnly) {
      return false;
    }
    return !!props.value;
  }, [props.value, props.readOnly, props.isClearable]);

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
    [props.disabled, props.mode, props.readOnly, isFocus],
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

  const handleReset = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (props.disabled) {
      return void 0;
    }
    props.onChange(null);
  };

  const handleChange = (value: string | null) => {
    props.onChange(value);
    dropDownEvents.emit('close');
  };

  return (
    <DropDown disabled={props.disabled || props.readOnly} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <DropDown.Content>
        <div className={wrapperClassName} ref={ref}>
          <Values value={props.value} format={props.displayFormat} disabled={props.disabled} />
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
          <Calendar {...props} onChange={handleChange} />
        </div>
      </DropDown.List>
    </DropDown>
  );
});
