import { Form } from '@library/design';
import { Caption, Field, Label, Textarea } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

interface DescriptionProps {
  inProcess: boolean;
}

export const Description: React.FC<DescriptionProps> = ({ inProcess }) => {
  const { control } = useFormContext<IFormData>();

  return (
    <Controller
      name={'description'}
      control={control}
      disabled={inProcess}
      render={({ field, fieldState: { error } }) => (
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Описание'} />
              </Field.Label>
              <Field.Content>
                <Textarea {...field} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Описание'} />
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
