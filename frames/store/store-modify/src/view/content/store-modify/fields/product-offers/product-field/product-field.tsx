import { Caption, Field, InputSelect, Label } from '@sellgar/kit';
import { reactive, useController } from '@sellgar/app/react';

import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { type IFormData } from '../../../form.schema.ts';
import { type ProductOption } from '../product-option.ts';
import { ProductListControllerInterface } from '../../../../../../classes/controller/product-list/product-list-controller.interface.ts';

import s from './default.module.scss';

interface IProps {
  onProductChange: (product: ProductOption | null) => void;
}

const ProductFieldComponent: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  const controller = useController(ProductListControllerInterface);
  const product = useWatch({ control, name: 'product' });
  const options = [...(product ? [product] : []), ...controller.options.filter((item) => item.uuid !== product?.uuid)];

  return (
    <div className={s.wrapper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'product'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Товар'} />
                  </Field.Label>
                  <Field.Content>
                    <InputSelect
                      ref={field.ref}
                      disabled={field.disabled}
                      isClearable={true}
                      options={options}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      placeholder={'Выберите товар'}
                      loading={controller.loading}
                      error={controller.error}
                      searchPlaceholder={'Название товара'}
                      value={field.value}
                      onSearch={(term) => {
                        void controller.search(term);
                      }}
                      onBlur={field.onBlur}
                      onChange={(nextProduct) => {
                        if (nextProduct?.uuid !== field.value?.uuid) {
                          field.onChange(nextProduct);
                          props.onProductChange(nextProduct);
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

export const ProductField = reactive(ProductFieldComponent);
