import { PropertyEntity } from '@library/domain';
import { Field } from '@library/kit';
import { Input, Textarea, Button, Select } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';

import { useGetUnits } from '../../../../../hooks/get-units.hook.ts';
import { useGetGroups } from '../../../../../hooks/get-groups.hook.ts';
import { useGetBrandInProcess } from '../../../../../hooks/get-brand-in-process.hook.ts';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  defaultValues: Partial<PropertyEntity>;
  onSubmit(data: PropertyEntity): void;
}

const types = [
  { code: 'TEXT', name: 'Текст' },
  { code: 'CHECKBOX', name: 'Чекбокс' },
  { code: 'RADIO', name: 'Радио кнопка' },
  { code: 'DATE', name: 'Дата' },
  { code: 'RANGE', name: 'Диапазон' },
];

export const Form: React.FC<IProps> = observer((props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropertyEntity>({ defaultValues: props.defaultValues });

  const units = useGetUnits();
  const groups = useGetGroups();
  const inProcess = useGetBrandInProcess();

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'groupUuid'}
            control={control}
            render={({ field }) => {
              return (
                <Field label={'Группа'} error={errors.groupUuid?.message}>
                  <Select
                    optionKey={'uuid'}
                    optionValue={'name'}
                    options={groups}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                </Field>
              );
            }}
          />
        </div>
        <div className={s.field}>
          <Field label={'Коде'} error={errors.code?.message}>
            <Input {...register('code')} placeholder={'Код'} />
          </Field>
        </div>
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
        <div className={s.field}>
          <Controller
            name={'type'}
            control={control}
            render={({ field }) => {
              return (
                <Field label={'Тип'} error={errors.type?.message}>
                  <Select
                    optionKey={'code'}
                    optionValue={'name'}
                    options={types}
                    value={field.value}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                </Field>
              );
            }}
          />
        </div>
        <div className={s.field}>
          <Controller
            name={'unitUuid'}
            control={control}
            render={({ field }) => {
              return (
                <Field label={'Размерность'} error={errors.unitUuid?.message}>
                  <Select
                    isClearable={true}
                    optionKey={'uuid'}
                    optionValue={'name'}
                    options={units}
                    value={field.value ?? undefined}
                    onBlur={field.onBlur}
                    onChange={field.onChange}
                  />
                </Field>
              );
            }}
          />
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
