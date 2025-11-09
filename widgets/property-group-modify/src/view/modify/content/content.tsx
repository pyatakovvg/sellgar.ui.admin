import { Form } from '@library/design';
import { Input, Textarea, Field, Label, Caption, Select } from '@sellgar/kit';

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { IFormData } from '../schema.ts';

import s from './default.module.scss';

export const Content: React.FC = () => {
  const {
    register,
    control,
    formState: { isSubmitting, errors },
  } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Наименование'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('name')}
                  autoFocus={true}
                  target={errors.name?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Наименование'}
                  disabled={isSubmitting}
                />
              </Field.Content>
              {errors.name?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.name.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Описание'} />
              </Field.Label>
              <Field.Content>
                <Textarea
                  {...register('description')}
                  target={errors.description?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Описание'}
                  disabled={isSubmitting}
                />
              </Field.Content>
              {errors.description?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.description.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
      </div>
    </div>
  );
};
