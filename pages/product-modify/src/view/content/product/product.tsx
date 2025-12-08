import { Field, Label, Caption, Input, Select, SelectTree, Textarea, Typography } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { useBrands } from '../../../hooks/brands.hook.ts';
import { useCategories } from '../../../hooks/categories.hook.ts';

import s from './product.module.scss';

export const Product = () => {
  const { control } = ReactHookForm.useFormContext();

  const brands = useBrands();
  const categories = useCategories();

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'body-m'} weight={'semi-bold'}>
          <p>Основная информация</p>
        </Typography>
      </div>
      <div className={s.content}>
        <div className={s.line}>
          <div className={s.field}>
            <ReactHookForm.Controller
              control={control}
              name={'name'}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Название товара'} />
                  </Field.Label>
                  <Field.Content>
                    <Input size={'md'} {...field} target={error?.message ? 'destructive' : undefined} />
                  </Field.Content>
                  {error?.message && (
                    <Field.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </Field.Caption>
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        <div className={s.line}>
          <div className={s.field}>
            <ReactHookForm.Controller
              control={control}
              name={'categoryUuid'}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Категория'} />
                  </Field.Label>
                  <Field.Content>
                    <SelectTree
                      accessor={'children'}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      options={categories}
                      target={error?.message ? 'destructive' : undefined}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      onBlur={() => field.onBlur()}
                    />
                  </Field.Content>
                  {error?.message && (
                    <Field.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </Field.Caption>
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        <div className={s.line}>
          <div className={s.field}>
            <ReactHookForm.Controller
              control={control}
              name={'brandUuid'}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Брэнд'} />
                  </Field.Label>
                  <Field.Content>
                    <Select
                      optionKey={'uuid'}
                      optionValue={'name'}
                      options={brands}
                      target={error?.message ? 'destructive' : undefined}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      onBlur={() => field.onBlur()}
                    />
                  </Field.Content>
                  {error?.message && (
                    <Field.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </Field.Caption>
                  )}
                </Field>
              )}
            />
          </div>
        </div>
        <div className={s.line}>
          <div className={s.field}>
            <ReactHookForm.Controller
              control={control}
              name={'description'}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Основное описание'} />
                  </Field.Label>
                  <Field.Content>
                    <Textarea {...field} target={error?.message ? 'destructive' : undefined} />
                  </Field.Content>
                  {error?.message && (
                    <Field.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </Field.Caption>
                  )}
                </Field>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
