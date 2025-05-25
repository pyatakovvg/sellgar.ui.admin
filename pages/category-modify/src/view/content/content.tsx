import { Field } from '@library/kit';
import { Form } from '@library/design';
import { CategoryEntity } from '@library/domain';
import { Input, Textarea, SelectTree } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useFormContext, Controller } from 'react-hook-form';

import { useCategories } from '../../hooks/categories.hook.ts';

import s from './default.module.scss';

export const Content: React.FC = observer(() => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CategoryEntity>();

  const categories = useCategories();

  return (
    <div className={s.wrapper}>
      <Form>
        <Form.Fields>
          <Form.Fields.Field>
            <Controller
              //@ts-ignore
              name={'parentUuid'}
              control={control}
              render={({ field }) => {
                return (
                  <Field label={'Родительская категория'} error={errors.parentUuid?.message}>
                    <SelectTree
                      isClearable={true}
                      placeholder={'Родительская категория'}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      accessor={'children'}
                      value={field.value ?? undefined}
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
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field label={'Название'} error={errors.name?.message}>
              <Input {...register('name')} placeholder={'Наименование'} />
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
        <Form.Fields>
          <Form.Fields.Field>
            <Field label={'Описание'} error={errors.description?.message}>
              <Textarea {...register('description')} placeholder={'Описание'} />
            </Field>
          </Form.Fields.Field>
        </Form.Fields>
      </Form>
    </div>
  );
});
