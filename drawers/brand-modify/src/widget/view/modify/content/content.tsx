import { Form } from '@library/design';
import { BrandEntity } from '@library/domain';
import { Input, Textarea, Field, Label, Caption } from '@sellgar/kit';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import s from './default.module.scss';

export const Content: React.FC = () => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext<BrandEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Код'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('code')}
                  autoFocus={true}
                  target={errors.code?.message ? 'destructive' : undefined}
                  size={'md'}
                  placeholder={'Код'}
                  disabled={isSubmitting}
                />
              </Field.Content>
              {errors.code?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={errors.code.message} />
                </Field.Caption>
              )}
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field>
              <Field.Label>
                <Label label={'Наименование'} />
              </Field.Label>
              <Field.Content>
                <Input
                  {...register('name')}
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
