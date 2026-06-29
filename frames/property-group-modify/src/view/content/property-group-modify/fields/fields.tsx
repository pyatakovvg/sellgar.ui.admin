import { Form } from '@library/design';
import { Caption, Field, Input, Label, Textarea } from '@sellgar/kit';

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
                  <Label label={'Наименование'} />
                </Field.Label>
                <Field.Content>
                  <Input {...field} autoFocus={true} target={error?.message ? 'destructive' : undefined} size={'md'} placeholder={'Наименование'} />
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
      <Controller
        name={'description'}
        control={control}
        disabled={props.inProcess}
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
    </div>
  );
};
