import React from 'react';
import { Field, type FieldProps } from 'formik';

import { EMode } from '@/types';
import { Select } from '@/symbols/Select';
import type { ISelect } from '@/symbols/Select/types';
import { Field as FieldLabel } from '@/symbols/Field';

interface ISelectFieldProps<T> extends ISelect<T> {
  name: string;
  options: T[];
  optionKey: keyof T;
  optionValue: keyof T;
  isMultiselect?: boolean;
  label?: string;
  autoFocus?: boolean;
}

export const SelectField = ({ name, ...props }: ISelectFieldProps<any>) => {
  return (
    <Field name={name}>
      {({ field, form, meta: { touched, error } }: FieldProps) => {
        console.log(props.options);
        const hasError = touched && error;
        return (
          <FieldLabel label={props.label} message={hasError && error}>
            <Select
              {...props}
              {...field}
              mode={hasError ? EMode.DANGER : EMode.DEFAULT}
              onChange={(e) => {
                return form.setFieldValue(name, e);
              }}
            />
          </FieldLabel>
        );
      }}
    </Field>
  );
};
