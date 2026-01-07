import { Field, Label, Caption, InputAmount } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Controller
          name={'currentPrice.value'}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Label>
                <Label label={'Цена'} />
              </Field.Label>
              <Field.Content>
                <InputAmount {...field} onChange={(value) => field.onChange(value)} />
              </Field.Content>
              {error?.message && (
                <Field.Caption>
                  <Caption state={'destructive'} caption={error?.message} />
                </Field.Caption>
              )}
            </Field>
          )}
        ></Controller>
      </div>
    </div>
  );
};
