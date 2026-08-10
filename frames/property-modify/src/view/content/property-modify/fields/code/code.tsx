import { Form } from '@library/design';
import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../../form.schema.ts';

interface IProps {
  inProcess: boolean;
}

export const Code: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();

  return (
    <Controller
      name={'code'}
      control={control}
      disabled={props.inProcess}
      render={({ field, fieldState: { error } }) => (
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Код'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...field}
                  autoFocus={true}
                  target={error?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Код'}
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
