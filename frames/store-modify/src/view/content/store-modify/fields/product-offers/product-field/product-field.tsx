import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { type IFormData } from '../../../form.schema.ts';
import { type ProductOption } from '../product-option.ts';

import s from './default.module.scss';

interface ProductProps {
  products: ProductOption[];
  onProductChange: (productUuid: string) => void;
}

export const ProductField: React.FC<ProductProps> = ({ products, onProductChange }) => {
  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'productUuid'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Товар'} />
                  </Field.Label>
                  <Field.Content>
                    <Select
                      {...field}
                      options={products}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      onBlur={field.onBlur}
                      onChange={(value) => {
                        const productUuid = value ?? '';

                        field.onChange(productUuid);

                        if (productUuid !== field.value) {
                          onProductChange(productUuid);
                        }
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
