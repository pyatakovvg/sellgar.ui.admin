import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { useVariant } from '../../hooks/use-variant.hook.ts';
import type { IFormData } from '../../../../../schema.ts';

export const Name: React.FC = () => {
  const { control } = ReactHookForm.useFormContext<IFormData>();
  const variant = useVariant();

  return (
    <ReactHookForm.Controller
      control={control}
      name={`variants.${variant.index}.name`}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Наименование'} />
          </Field.Label>
          <Field.Content>
            <Input {...field} value={field.value ?? ''} target={error?.message ? 'destructive' : undefined} />
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
