import { Form } from '@library/design';
import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

interface NameProps {
  inProcess: boolean;
}

export const Name: React.FC<NameProps> = ({ inProcess }) => {
  const { control } = useFormContext<IFormData>();

  return (
    <Controller
      name={'name'}
      control={control}
      disabled={inProcess}
      render={({ field, fieldState: { error } }) => (
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Наименование'} />
              </Field.Label>
              <Field.Content>
                <Input {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Наименование'} />
              </Field.Content>
              {error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
      )}
    />
  );
};
