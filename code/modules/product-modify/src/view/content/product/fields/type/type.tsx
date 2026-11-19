import * as App from '@sellgar/app/react';
import { Caption, Field, Label, Select } from '@sellgar/kit';
import React from 'react';
import * as RHF from 'react-hook-form';

import { ProductControllerInterface } from '../../../../../classes/controller/product/product-controller.interface.ts';
import { ProductFormMapper } from '../../../../../classes/controller/product/mapper/product-form.mapper.ts';
import type { IFormData } from '../../../../schema.ts';

export const Type: React.FC = () => {
  const { control, getValues, setValue } = RHF.useFormContext<IFormData>();
  const loaderData = App.useLoaderData(ProductControllerInterface);
  const isEdit = Boolean(loaderData.product);

  const handleChange = (uuid?: string) => {
    const type = loaderData.productTypes.items.find((item) => item.uuid === uuid);

    setValue('typeUuid', uuid ?? '', { shouldValidate: true, shouldDirty: true });
    setValue('typeVersion', type?.version, { shouldValidate: true, shouldDirty: true });

    if (type) {
      setValue('properties', ProductFormMapper.createProductPropertiesForType(type, getValues('properties')), {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue('variants', ProductFormMapper.createVariantsForType(type, getValues('variants')), {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <RHF.Controller
      control={control}
      name={'typeUuid'}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Тип товара'} />
          </Field.Label>
          <Field.Content>
            <Select
              optionKey={'uuid'}
              optionValue={'name'}
              options={loaderData.productTypes.items}
              disabled={isEdit}
              target={error?.message ? 'destructive' : undefined}
              value={field.value}
              onChange={handleChange}
              onBlur={field.onBlur}
            />
          </Field.Content>
          {error?.message ? (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          ) : null}
        </Field>
      )}
    />
  );
};
