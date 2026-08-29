import * as App from '@sellgar/app-v2/react';
import { Caption, Field, Label, Select } from '@sellgar/kit';

import React from 'react';
import * as RHF from 'react-hook-form';

import { BrandOptionsControllerInterface } from '../../../../../classes/controller/brand-options/brand-options-controller.interface.ts';
import type { IFormData } from '../../../../schema.ts';

export const Brand: React.FC = () => {
  const { control } = RHF.useFormContext<IFormData>();
  const brands = App.useLoaderData(BrandOptionsControllerInterface);

  return (
    <RHF.Controller
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
              options={brands.data}
              target={error?.message ? 'destructive' : undefined}
              value={field.value}
              onChange={field.onChange}
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
