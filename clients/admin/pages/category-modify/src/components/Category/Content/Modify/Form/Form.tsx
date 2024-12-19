import { CategoryEntity } from '@library/domain';
import { Field, Input, TreeSelect, Button } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useForm, Controller } from 'react-hook-form';

import { useGetAllCategoriesData } from '../../../../../hooks/get-all-category-data.hook.ts';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  defaultValues: Partial<CategoryEntity>;
  onSubmit(data: CategoryEntity): void;
}

export const Form: React.FC<IProps> = observer((props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryEntity>({ defaultValues: props.defaultValues });

  const categories = useGetAllCategoriesData();

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div className={s.fields}>
        <div className={s.field}>
          <Field error={errors.name?.message}>
            <Input {...register('name')} placeholder={'Наименование'} />
          </Field>
        </div>
        <div className={s.field}>
          <Field error={errors.description?.message}>
            <Input {...register('description')} placeholder={'Описание'} />
          </Field>
        </div>
        <div className={s.field}>
          <Controller
            //@ts-ignore
            name={'parentUuid'}
            control={control}
            render={({ field }) => {
              return (
                <Field error={errors.parentUuid?.message}>
                  <TreeSelect
                    isClearable={true}
                    placeholder={'Родительская категория'}
                    optionKey={'uuid'}
                    optionValue={'name'}
                    optionSubItemsKey={'children'}
                    value={field.value ?? null}
                    options={categories}
                    onChange={(value) => {
                      return field.onChange(value);
                    }}
                    onBlur={field.onBlur}
                  />
                </Field>
              );
            }}
          />
        </div>
      </div>
      <div className={s.control}>
        <Button type={'submit'}>Сохранить</Button>
      </div>
    </form>
  );
});
