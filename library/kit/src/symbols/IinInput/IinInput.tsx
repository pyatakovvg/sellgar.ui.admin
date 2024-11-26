import React from 'react';
import { useMask, format, unformat } from '@react-input/mask';

import { EMode } from '../../kit.types.ts';
import { Input } from '../Input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const defaultOptions = {
  mask: '___ ___ ___ ___',
  replacement: { _: /\d/ },
};

const IinInputComponent = React.forwardRef<HTMLInputElement, IProps>(({ defaultValue, ...props }, ref) => {
  const inputRef = useMask(defaultOptions);

  React.useImperativeHandle(ref, () => inputRef.current!);

  return <Input ref={inputRef} {...props} />;
});

type TIinInput = typeof IinInputComponent & {
  format(value: string): string;
  unFormat(value: string): string;
};

export const IinInput: TIinInput = Object.assign(IinInputComponent, {
  format(value: string) {
    return format(String(value), defaultOptions);
  },
  unFormat(value: string) {
    return unformat(String(value), defaultOptions);
  },
});
