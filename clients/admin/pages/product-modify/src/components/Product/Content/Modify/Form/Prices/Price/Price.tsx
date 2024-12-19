import { Field, Input, Heading } from '@library/kit';

import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { CreateProductDto } from '../../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../../classes/store/form/dto/update-product.dto.ts';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { control, register } = useFormContext<CreateProductDto | UpdateProductDto>();
  const { errors } = useFormState({ control });

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H4'}>Цена</Heading>
      </div>
      <div className={s.content}>
        <Field label={'Цена'} error={errors.name?.message}>
          <Input {...register('price')} />
        </Field>
      </div>
    </div>
  );
};
