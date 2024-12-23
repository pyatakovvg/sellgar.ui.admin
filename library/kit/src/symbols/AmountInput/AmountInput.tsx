import React from 'react';
import { useNumberFormat, format, unformat } from '@react-input/number-format';

import { Input } from '../Input';
import { EMode } from '../../kit.types.ts';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.RefCallback<HTMLInputElement> | React.RefObject<HTMLInputElement>;
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const options = {
  locales: 'ru',
  maximumFractionDigits: 2,
};

const AmountInputComponent: React.FC<IProps> = ({ ref, ...props }) => {
  const inputRef = useNumberFormat(options);

  React.useImperativeHandle(ref, () => inputRef.current, [inputRef]);

  return <Input ref={inputRef} {...props} />;
};

type TAmountInput = typeof AmountInputComponent & {
  format(value: string | number): string;
  unformat(value: string): string;
};

export const AmountInput: TAmountInput = Object.assign(AmountInputComponent, {
  format(value: string | number) {
    return format(String(value), options);
  },
  unformat(value: string) {
    return unformat(value, options.locales);
  },
});
