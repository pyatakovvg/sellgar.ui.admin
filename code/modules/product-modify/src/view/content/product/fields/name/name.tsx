import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';

export const Name: React.FC = () => {
  const { control } = RHF.useFormContext<IFormData>();

  return (
    <RHF.Controller
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
          {error?.message ? (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          ) : null}
        </Field>
      )}
    />
  );
};
