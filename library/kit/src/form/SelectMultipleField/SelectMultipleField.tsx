import React from 'react';
import { Field, type FieldProps } from 'formik';

import { EMode } from '@/types';
import { SelectMultiple } from '@/symbols/SelectMultiple';
import { Field as FieldLabel } from '@/symbols/Field';

interface ISelectSimpleFieldProps {
  name: string;
  label?: string;
  readOnly?: boolean;
  isSimplify?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  mode?: string;
  placeholder?: string;
  optionKey: string;
  optionValue: string;
  options: any[];
}

export const SelectMultipleField = ({ name, ...props }: ISelectSimpleFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta: { touched, error } }: FieldProps) => {
        const hasError = touched && error;
        return (
          <FieldLabel label={props.label} message={hasError && error}>
            <SelectMultiple
              {...props}
              {...field}
              mode={hasError ? EMode.DANGER : undefined}
              onChange={(e: any) => {
                return form.setFieldValue(name, e);
              }}
            />
          </FieldLabel>
        );
      }}
    </Field>
  );
};
