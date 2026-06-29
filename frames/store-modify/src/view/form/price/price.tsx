import { Field, Label, Caption, Input } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { type IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Controller
          name={'currentPrice.value'}
          control={control}
          render={({ field, fieldState: { error } }) => {
            return (
              <Field>
                <Field.Label>
                  <Label label={'Цена'} />
                </Field.Label>
                <Field.Content>
                  <Input
                    {...field}
                    // tailSlot={
                    //   <Dropdown
                    //     options={currency}
                    //     optionKey={'code'}
                    //     optionValue={'name'}
                    //     value={currentCurrencyCode}
                    //     onChange={(currencyCode) => handleCurrencyChange(currencyCode)}
                    //   />
                    // }
                    value={field.value}
                    onBlur={() => field.onBlur()}
                    onChange={(value) => field.onChange(value)}
                  />
                </Field.Content>
                {error?.message && (
                  <Field.Caption>
                    <Caption state={'destructive'} caption={error?.message} />
                  </Field.Caption>
                )}
              </Field>
            );
          }}
        ></Controller>
      </div>
    </div>
  );
};
