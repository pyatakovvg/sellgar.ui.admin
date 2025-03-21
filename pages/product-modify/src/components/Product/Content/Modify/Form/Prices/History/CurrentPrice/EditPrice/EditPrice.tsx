import { Field, Icon, AmountInput } from '@library/kit';
import { Input } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { CreateProductDto } from '../../../../../../../../../classes/store/form/dto/create-product.dto.ts';
import { UpdateProductDto } from '../../../../../../../../../classes/store/form/dto/update-product.dto.ts';

import s from './default.module.scss';

interface IProps {
  value: number;
  onReset?(): void;
}

export const EditPrice: React.FC<IProps> = (props) => {
  const { control } = useFormContext<CreateProductDto | UpdateProductDto>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Controller
          name={'price'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Field error={error?.message}>
              <Input
                ref={field.ref}
                defaultValue={props.value}
                tailIcon={
                  props.onReset && (
                    <div className={s.reset} onClick={props.onReset}>
                      <Icon icon={'clear'} size={18} />
                    </div>
                  )
                }
                onBlur={() => field.onBlur()}
                onChange={(event) => field.onChange(AmountInput.unformat(event.target.value))}
              />
            </Field>
          )}
        ></Controller>
      </div>
    </div>
  );
};
