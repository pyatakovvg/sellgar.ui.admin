import { BrandEntity } from '@library/domain';
import { Field } from '@library/kit';
import { Input, Textarea, Button } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';

import { useGetBrandInProcess } from '../../../../../hooks/get-brand-in-process.hook.ts';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  defaultValues: Partial<BrandEntity>;
  onSubmit(data: BrandEntity): void;
}

export const Form: React.FC<IProps> = observer((props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandEntity>({ defaultValues: props.defaultValues });

  const inProcess = useGetBrandInProcess();

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div className={s.fields}>
        <div className={s.field}>
          <Field label={'Код'} error={errors.name?.message}>
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
      <div className={s.control}>
        <Button type={'submit'} disabled={inProcess}>
          Сохранить
        </Button>
      </div>
    </form>
  );
});
