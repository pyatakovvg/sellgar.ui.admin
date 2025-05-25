import { FieldWrapper, Label, Caption, InputNumeral, Checkbox } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormState, useFormContext } from 'react-hook-form';

import { CreateProductStoreDto } from '../../../classes/store/form/dto/create-product-store.dto.ts';

import s from './default.module.scss';

export const Common: React.FC = () => {
  const { control, register } = useFormContext<CreateProductStoreDto>();
  const { errors } = useFormState({ control });

  return (
    <div className={s.wrappper}>
      <div className={s.content}>
        <div className={s.field}>
          <Controller
            name={'showing'}
            control={control}
            render={({ field }) => {
              return (
                <FieldWrapper>
                  <FieldWrapper.Content>
                    <Checkbox
                      checked={field.value}
                      label={'Отображать на витрине'}
                      caption={'Будет отображаться покупателю и участвовать в поиске'}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
                    />
                  </FieldWrapper.Content>
                  {!!errors.showing?.message && (
                    <FieldWrapper.Caption>
                      <Caption state={'destructive'} caption={errors.showing.message} />
                    </FieldWrapper.Caption>
                  )}
                </FieldWrapper>
              );
            }}
          />
        </div>
        <div className={s.field}>
          <Controller
            name={'count'}
            render={({ field, fieldState: { error } }) => {
              return (
                <FieldWrapper>
                  <FieldWrapper.Label>
                    <Label label={'Количество на складе'} />
                  </FieldWrapper.Label>
                  <FieldWrapper.Content>
                    <InputNumeral
                      {...field}
                      autoFocus={true}
                      defaultValue={0}
                      onChange={(event) => field.onChange(InputNumeral.unFormat(event.target.value))}
                    />
                  </FieldWrapper.Content>
                  {!!error?.message && (
                    <FieldWrapper.Caption>
                      <Caption state={'destructive'} caption={error.message} />
                    </FieldWrapper.Caption>
                  )}
                </FieldWrapper>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
