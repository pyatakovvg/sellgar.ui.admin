import { Field } from '@library/kit';
import { Form } from '@library/design';
import { BrandEntity } from '@library/domain';
import { Input, Textarea } from '@sellgar/kit';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useInProcess } from '../../hooks/in-process.hook.ts';

import s from './default.module.scss';

export const Content: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BrandEntity>();

  const inProcess = useInProcess();

  return (
    <div className={s.wrapper}>
      <Form>
        <Form.Fields>
          <Form.Fields.Field>
            <Field label={'Код'} error={errors.code?.message}>
              <Input {...register('code')} size={'md'} placeholder={'Код'} disabled={inProcess} />
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field label={'Наименование'} error={errors.name?.message}>
              <Input {...register('name')} size={'md'} placeholder={'Наименование'} disabled={inProcess} />
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field label={'Описание'} error={errors.description?.message}>
              <Textarea {...register('description')} size={'md'} placeholder={'Описание'} disabled={inProcess} />
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
      </Form>
    </div>
  );
};
