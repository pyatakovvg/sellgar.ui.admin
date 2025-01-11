'use client';

import React from 'react';

import { FieldWrapper } from '../_parts/FieldWrapper';
import { EMode } from '../../kit.types.ts';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.RefCallback<HTMLTextAreaElement> | React.RefObject<HTMLTextAreaElement>;
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
  React.useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = 'auto';
      textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
    }
  }, [textAreaRef, value]);
};

export const Textarea: React.FC<IProps> = ({ ref, mode, leftIcon, rightIcon, ...props }) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState('');

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

  React.useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

  useAutosizeTextArea(inputRef.current, value);

  return (
    <FieldWrapper mode={mode} disabled={props.disabled}>
      <div className={className} data-theme="input">
        <textarea
          ref={inputRef}
          {...props}
          className={elementClassName}
          onInput={(event: React.FocusEvent<HTMLTextAreaElement>) => {
            return setValue(event.target.value);
          }}
        />
      </div>
    </FieldWrapper>
  );
};
