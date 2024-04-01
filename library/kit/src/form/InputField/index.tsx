import React from 'react';
import { Field, type FieldProps } from 'formik';

import { EMode } from '@/types';
import { Input } from '@/symbols/Input/Base';
import type { IInput } from '@/symbols/Input/Base/types';
import { Field as FieldLabel } from '@/symbols/Field';

interface IInputFieldProps extends IInput {
  name: string;
  label?: string;
  type?: 'email' | 'password';
  autoFocus?: boolean;
}

export const InputField = ({ name, ...props }: IInputFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta: { touched, error } }: FieldProps) => {
        const hasError = touched && error;
        return (
          <FieldLabel label={props.label} message={hasError && error}>
            <Input {...props} {...field} mode={hasError ? EMode.DANGER : EMode.DEFAULT} />
          </FieldLabel>
        );
      }}
    </Field>
  );
};
