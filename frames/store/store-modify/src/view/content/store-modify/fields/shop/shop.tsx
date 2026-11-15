import { CategoryListControllerInterface } from '../../../../../classes/controller/category-list/category-list-controller.interface.ts';
import { StoreModifyControllerInterface } from '../../../../../classes/controller/store-modify/store-modify-controller.interface.ts';
import { Field, Label, Caption, Select } from '@sellgar/kit';
import { useController, useLoaderData } from '@sellgar/app/react';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ShopListControllerInterface } from '../../../../../classes/controller/shop-list/shop-list-controller.interface.ts';

import { type IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

export const Shop: React.FC = () => {
  const shops = useLoaderData(ShopListControllerInterface);
  const categories = useController(CategoryListControllerInterface);

  const product = useLoaderData(StoreModifyControllerInterface);
  const { control, setValue } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'shopUuid'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Магазин'} />
                  </Field.Label>
                  <Field.Content>
                    <Select
                      {...field}
                      disabled={field.disabled || Boolean(product)}
                      options={shops}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      onBlur={field.onBlur}
                      onChange={(data) => {
                        if (data === field.value) return;
                        setValue('categoryUuids', [], { shouldDirty: true, shouldValidate: true });
                        field.onChange(data);
                        void categories.load(data ?? '');
                      }}
                    />
                  </Field.Content>
                  {!!error?.message && (
                    <Field.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </Field.Caption>
                  )}
                </Field>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
