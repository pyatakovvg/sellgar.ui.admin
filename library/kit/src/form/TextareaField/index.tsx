import React from 'react';
import { Field, type FieldProps } from 'formik';

import { EMode } from '@/types';
import { Textarea } from '@/symbols/Textarea/Base';
import type { ITextarea } from '@/symbols/Textarea/Base/types';
import { Field as FieldLabel } from '@/symbols/Field';

interface IInputFieldProps extends ITextarea {
  name: string;
  label?: string;
  type?: 'email' | 'password';
  autoFocus?: boolean;
}

export const TextareaField = ({ name, ...props }: IInputFieldProps) => {
  return (
    <Field name={name}>
      {({ field, meta: { touched, error } }: FieldProps) => {
        const hasError = touched && error;
        return (
          <FieldLabel label={props.label} message={hasError && error}>
            <Textarea {...props} {...field} mode={hasError ? EMode.DANGER : EMode.DEFAULT} />
          </FieldLabel>
        );
      }}
    </Field>
  );
};
