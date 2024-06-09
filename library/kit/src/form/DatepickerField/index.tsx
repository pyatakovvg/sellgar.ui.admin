import React from 'react';
import { Field, type FieldProps } from 'formik';

import { EMode } from '@/types';
import { Field as FieldLabel } from '@/symbols/Field';
import { Datepicker } from '@/symbols/Datepicker';

import type { IDatepicker } from '@/symbols/Datepicker/types';

interface IDatepickerFieldProps extends IDatepicker {
  name: string;
  label?: string;
  displayFormat?: string;
}

export const DatepickerField = React.memo(({ name, ...props }: IDatepickerFieldProps) => {
  return (
    <Field name={name}>
      {({ field, form, meta: { touched, error } }: FieldProps) => {
        const hasError = touched && error;
        return (
          <FieldLabel label={props.label} message={hasError && error}>
            <Datepicker
              {...props}
              value={field.value}
              mode={hasError ? EMode.DANGER : undefined}
              onChange={(e) => {
                return form.setFieldValue(name, e);
              }}
              onBlur={() => field.onBlur(null)}
            />
          </FieldLabel>
        );
      }}
    </Field>
  );
});
