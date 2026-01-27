import { Field, Label, Caption, InputAmount, Dropdown } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { useCurrency } from '../../../hooks/currency.hook.ts';

import { type IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

export const Price: React.FC = () => {
  const { control, setValue } = useFormContext<IFormData>();

  const currency = useCurrency();

  const currentCurrencyCode = useWatch({ name: 'currentPrice.currencyCode', control });
  const handleCurrencyChange = (currencyCode?: string) => {
    setValue('currentPrice.currencyCode', currencyCode!, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

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
                  <InputAmount
                    {...field}
                    tailSlot={
                      <Dropdown
                        options={currency}
                        optionKey={'code'}
                        optionValue={'name'}
                        value={currentCurrencyCode}
                        onChange={(currencyCode) => handleCurrencyChange(currencyCode)}
                      />
                    }
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
