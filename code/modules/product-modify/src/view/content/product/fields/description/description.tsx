import { Caption, Field, Label, Textarea } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import type { IFormData } from '../../../../schema.ts';

export const Description: React.FC = () => {
  const { control } = RHF.useFormContext<IFormData>();

  return (
    <RHF.Controller
      control={control}
      name={'description'}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Основное описание'} />
          </Field.Label>
          <Field.Content>
            <Textarea
              {...field}
              value={field.value ?? ''}
              target={error?.message ? 'destructive' : undefined}
              onInput={(event: React.FormEvent<HTMLTextAreaElement>) => field.onChange(event.currentTarget.value)}
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
