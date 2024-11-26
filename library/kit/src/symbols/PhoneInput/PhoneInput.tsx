import React from 'react';
import { useMask, format, unformat } from '@react-input/mask';

import { Input } from '../Input';
import { EMode } from '../../kit.types.ts';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  defaultValue?: string;
}

const defaultOptions = {
  mask: '+_ (___) ___-__-__',
  replacement: { _: /\d/ },
};

const PhoneInputComponent = React.forwardRef<HTMLInputElement, IProps>((props, ref) => {
  const inputRef = useMask({
    ...defaultOptions,
  });

  React.useImperativeHandle(ref, () => inputRef.current!);

  return <Input ref={inputRef} {...props} />;
});

type TPhoneInput = typeof PhoneInputComponent & {
  format(value: string): string;
  unFormat(value: string): string;
};

export const PhoneInput: TPhoneInput = Object.assign(PhoneInputComponent, {
  format(value: string) {
    return format(String(value), defaultOptions);
  },
  unFormat(value: string) {
    return unformat(String(value), defaultOptions);
  },
});
