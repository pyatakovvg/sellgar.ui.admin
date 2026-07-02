import { Form } from '@library/design';
import { Caption, Field, Input, Label } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { IFormData } from '../form.schema.ts';

import s from './default.module.scss';

interface FieldsProps {
  inProcess: boolean;
}

export const Fields: React.FC<FieldsProps> = (props) => {
  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <Controller
        name={'name'}
        control={control}
        disabled={props.inProcess}
        render={({ field, fieldState: { error } }) => (
          <Form.Fields>
            <Form.Fields.Field>
              <Field>
                <Field.Label>
                  <Label label={'Название'} />
                </Field.Label>
                <Field.Content>
                  <Input
                    {...field}
                    autoFocus={true}
                    target={error?.message ? 'destructive' : undefined}
                    size={'md'}
                    placeholder={'Название магазина'}
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
    </div>
  );
};
