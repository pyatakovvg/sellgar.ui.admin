import * as App from '@sellgar/app';
import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { ProductFormOptionsControllerInterface } from '../../../../../classes/controller/product-form-options-controller.interface.ts';
import type { IFormData } from '../../../../schema.ts';

export const Brand: React.FC = () => {
  const { control } = ReactHookForm.useFormContext<IFormData>();
  const options = App.useLoaderData(ProductFormOptionsControllerInterface);

  return (
    <ReactHookForm.Controller
      control={control}
      name={'brandUuid'}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Label>
            <Label label={'Бренд'} />
          </Field.Label>
          <Field.Content>
            <Select
              optionKey={'uuid'}
              optionValue={'name'}
              options={options.brands}
              target={error?.message ? 'destructive' : undefined}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
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
  );
};
