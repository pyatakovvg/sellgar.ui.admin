import { PropertyGroupEntity } from '@library/domain';
import { Field } from '@library/kit';
import { Input, Textarea, Button } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';

import { useGetBrandInProcess } from '../../../../../hooks/get-brand-in-process.hook.ts';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  defaultValues: Partial<PropertyGroupEntity>;
  onSubmit(data: PropertyGroupEntity): void;
}

export const Form: React.FC<IProps> = observer((props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyGroupEntity>({ defaultValues: props.defaultValues });

  const inProcess = useGetBrandInProcess();

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div className={s.fields}>
        <div className={s.field}>
          <Field label={'Название'} error={errors.name?.message}>
            <Input {...register('name')} placeholder={'Наименование'} />
          </Field>
        </div>
        <div className={s.field}>
          <Field label={'Описание'} error={errors.description?.message}>
            <Textarea {...register('description')} placeholder={'Описание'} />
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
