import { Field, Label, Caption, Select } from '@sellgar/kit';
import { useLoaderData } from '@sellgar/app';
import { ShopEntity } from '@library/domain';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ShopListControllerInterface } from '../../../../../classes/controller/shop-list-controller.interface.ts';

import { type IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

export const Shop: React.FC = () => {
  const shops = useLoaderData(ShopListControllerInterface) as ShopEntity[];

  const { control } = useFormContext<IFormData>();

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
                      options={shops}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      onBlur={field.onBlur}
                      onChange={(data) => {
                        field.onChange(data);
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
