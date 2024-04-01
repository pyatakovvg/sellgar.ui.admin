import React from 'react';
import { Field, type FieldProps } from 'formik';

import { EMode } from '@/types';
import { Checkbox } from '@/symbols/Checkbox';
import { Field as FieldLabel } from '@/symbols/Field';

import type { ICheckbox } from '@/symbols/Checkbox/types';

interface ICheckboxFieldProps extends ICheckbox {
  name: string;
}

export const CheckboxField = ({ name, ...props }: React.PropsWithChildren<ICheckboxFieldProps>) => {
  return (
    <Field name={name}>
      {({ field, meta: { touched, error } }: FieldProps) => {
        const hasError = touched && error;
        return (
          <Checkbox {...props} {...field}>
            {props.children}
          </Checkbox>
        );
      }}
    </Field>
  );
};
