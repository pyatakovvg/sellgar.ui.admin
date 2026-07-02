import { CategoryEntity } from '@library/domain';
import { Field, Label, Caption, Input, Select, Textarea, Typography } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { useBrands } from '../../../hooks/brands.hook.ts';
import { useCategories } from '../../../hooks/categories.hook.ts';
import { Properties } from '../variants/variant/properties';

import s from './product.module.scss';

type CategoryOption = CategoryEntity & {
  label: string;
};

const flattenCategories = (items: CategoryEntity[], level = 0): CategoryOption[] => {
  return items.flatMap((item) => [
    {
      ...item,
      label: `${'  '.repeat(level)}${item.name}`,
    },
    ...flattenCategories(item.children ?? [], level + 1),
  ]);
};

export const Product = () => {
  const { control } = ReactHookForm.useFormContext();

  const brands = useBrands();
  const categories = useCategories();
  const categoryOptions = React.useMemo(() => flattenCategories(categories), [categories]);

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
                    <Input
                      size={'md'}
                      {...field}
                      value={field.value ?? ''}
                      target={error?.message ? 'destructive' : undefined}
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
              name={'categoryUuid'}
              render={({ field, fieldState: { error } }) => (
                <Field>
                  <Field.Label>
                    <Label label={'Категория'} />
                  </Field.Label>
                  <Field.Content>
                    <Select
                      optionKey={'uuid'}
                      optionValue={'label'}
                      options={categoryOptions}
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
                    <Textarea
                      {...field}
                      value={field.value ?? ''}
                      target={error?.message ? 'destructive' : undefined}
                      onInput={(event: React.FormEvent<HTMLTextAreaElement>) =>
                        field.onChange(event.currentTarget.value)
                      }
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
            <Properties name={'properties'} label={'Общие свойства товара'} />
          </div>
        </div>
      </div>
    </div>
  );
};
