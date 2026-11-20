import React from 'react';
import * as RHF from 'react-hook-form';
import { Caption, Field, Input, Label, Textarea } from '@sellgar/kit';
import { ProductProperties } from '@library/product-form';
import type { VariantFormInput } from '../../classes/controller/variant-modify/input/variant-form.input.ts';
import { Gallery } from './gallery';

export const Fields: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = RHF.useFormContext<VariantFormInput>();
  return (
    <>
      <Field>
        <Field.Label>
          <Label label={'Название варианта'} />
        </Field.Label>
        <Field.Content>
          <Input {...register('name')} target={errors.name ? 'destructive' : undefined} />
        </Field.Content>
        {errors.name && (
          <Field.Caption>
            <Caption state={'destructive'} caption={errors.name.message} />
          </Field.Caption>
        )}
      </Field>
      <Gallery />
      <ProductProperties name={'properties'} label={'Свойства варианта'} />
      <Field>
        <Field.Label>
          <Label label={'Описание'} />
        </Field.Label>
        <Field.Content>
          <Textarea {...register('description')} />
        </Field.Content>
      </Field>
    </>
  );
};
