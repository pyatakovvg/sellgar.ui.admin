import React from 'react';
import { useMask, format, unformat } from '@react-input/mask';

import { Input } from '../Input';
import { EMode } from '../../kit.types.ts';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.RefObject<HTMLInputElement> | React.RefCallback<HTMLInputElement>;
  mode?: EMode.PRIMARY | EMode.DANGER | EMode.SUCCESS;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const defaultOptions = {
  mask: '+_ (___) ___-__-__',
  replacement: { _: /\d/ },
};

const PhoneInputComponent: React.FC<IProps> = (props) => {
  const inputRef = useMask({
    ...defaultOptions,
  });

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = format(inputRef.current?.value, defaultOptions);
    }
  }, [inputRef]);

  React.useImperativeHandle(props.ref, () => inputRef.current);

  return <Input {...props} ref={inputRef} />;
};

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
