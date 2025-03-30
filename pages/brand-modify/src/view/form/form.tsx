import { Field } from '@library/kit';
import { BrandEntity } from '@library/domain';
import { Input, Textarea } from '@sellgar/kit';

import React from 'react';
import { useFormContext } from 'react-hook-form';

import s from './default.module.scss';

export const Form: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BrandEntity>();

  return (
    <form className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Field label={'Код'} error={errors.code?.message}>
            <Input {...register('code')} size={'md'} placeholder={'Код'} />
          </Field>
        </div>
        <div className={s.field}>
          <Field label={'Наименование'} error={errors.name?.message}>
            <Input {...register('name')} size={'md'} placeholder={'Наименование'} />
          </Field>
        </div>
        <div className={s.field}>
          <Field label={'Описание'} error={errors.description?.message}>
            <Textarea {...register('description')} size={'md'} placeholder={'Описание'} />
          </Field>
        </div>
      </div>
    </form>
  );
};
