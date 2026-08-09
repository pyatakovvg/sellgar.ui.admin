import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';

export const Name: React.FC = () => {
  const { control } = ReactHookForm.useFormContext<IFormData>();

  return (
    <ReactHookForm.Controller
      control={control}
      name={'name'}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Название товара'} />
          </Field.Label>
          <Field.Content>
            <Input
              {...field}
              size={'md'}
              value={field.value ?? ''}
              target={error?.message ? 'destructive' : undefined}
            />
          </Field.Content>
          {error?.message && (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          )}
        </Field>
      )}
    />
  );
};
