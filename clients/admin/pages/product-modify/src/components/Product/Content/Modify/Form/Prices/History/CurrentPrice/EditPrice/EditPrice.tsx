import { Field, Icon, Input, Text } from '@library/kit';

import React from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { CreateProductDto } from '../../../../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../../../../classes/store/form/dto/update-product.dto.ts';

import s from './default.module.scss';

interface IProps {
  value: number;
  onReset(): void;
}

export const EditPrice: React.FC<IProps> = (props) => {
  const { control, register } = useFormContext<CreateProductDto | UpdateProductDto>();
  const { errors } = useFormState({ control });

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Field error={errors.name?.message}>
          <Input
            {...register('price', { value: props.value })}
            autoFocus={true}
            rightIcon={
              <div className={s.reset} onClick={props.onReset}>
                <Icon icon={'clear'} size={18} />
              </div>
            }
          />
        </Field>
      </div>
    </div>
  );
};
