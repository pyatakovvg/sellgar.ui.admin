'use client';

import React from 'react';

import { FieldWrapper } from '../_parts/FieldWrapper';
import { EMode } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, IProps>(({ mode, leftIcon, rightIcon, ...props }, ref) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const className = React.useMemo(
    () =>
      cn(s.wrapper, props.className, {
        [s['mode--danger']]: mode === EMode.DANGER,
        [s['mode--success']]: mode === EMode.SUCCESS,
      }),
    [mode, props.className],
  );
  const elementClassName = React.useMemo(
    () =>
      cn(s.element, {
        [s['with-left-icon']]: leftIcon,
        [s['with-right-icon']]: rightIcon,
      }),
    [leftIcon, rightIcon],
  );

  React.useImperativeHandle(ref, () => inputRef.current!);

  return (
    <FieldWrapper mode={mode} disabled={props.disabled}>
      <div className={className} data-theme="input">
        {leftIcon && <div className={s.icon}>{leftIcon}</div>}
        <input ref={inputRef} {...props} className={elementClassName} />
        {rightIcon && <div className={s.icon}>{rightIcon}</div>}
      </div>
    </FieldWrapper>
  );
});
