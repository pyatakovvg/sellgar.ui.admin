import { Field, Label, Caption, InputNumeral, Input, Checkbox } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import s from './default.module.scss';

export const Common: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className={s.wrappper}>
      <div className={s.content}>
        <div className={s.field}>
          <Controller
            name={'showing'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Content>
                    <Checkbox
                      checked={field.value}
                      label={'Отображать на витрине'}
                      caption={'Будет отображаться покупателю и участвовать в поиске'}
                      onBlur={field.onBlur}
                      onChange={field.onChange}
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
        <div className={s.field}>
          <Controller
            name={'count'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Количество на складе'} />
                  </Field.Label>
                  <Field.Content>
                    <InputNumeral {...field} autoFocus={true} onChange={(value) => field.onChange(value)} />
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
        <div className={s.field}>
          <Controller
            name={'article'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Артикул'} />
                  </Field.Label>
                  <Field.Content>
                    <Input {...field} autoFocus={true} />
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
