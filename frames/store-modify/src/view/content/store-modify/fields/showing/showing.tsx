import { Caption, Checkbox, Field } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

export const Showing: React.FC = () => {
  const { control } = useFormContext<IFormData>();

  return (
    <Controller
      name={'showing'}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Content>
            <Checkbox
              checked={!!field.value}
              label={'Товар доступен на витрине'}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
            />
          </Field.Content>
          {!!error?.message && (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          )}
        </Field>
      )}
    />
  );
};
