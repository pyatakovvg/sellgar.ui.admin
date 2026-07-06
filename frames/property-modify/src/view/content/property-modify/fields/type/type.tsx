import { Form } from '@library/design';
import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { propertyTypes } from '../../form-values.ts';
import type { IFormData } from '../../form.schema.ts';

interface TypeProps {
  inProcess: boolean;
}

export const Type: React.FC<TypeProps> = ({ inProcess }) => {
  const { control } = useFormContext<IFormData>();

  return (
    <Controller
      name={'type'}
      control={control}
      disabled={inProcess}
      render={({ field, fieldState: { error } }) => (
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Тип'} />
              </Field.Label>
              <Field.Content>
                <Select
                  target={error?.message ? 'destructive' : undefined}
                  optionKey={'code'}
                  optionValue={'name'}
                  options={propertyTypes}
                  value={field.value}
                  disabled={inProcess}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                />
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
