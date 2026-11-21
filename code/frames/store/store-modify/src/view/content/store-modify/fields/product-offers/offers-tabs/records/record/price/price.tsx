import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Caption, Field, InputAmount2, Label, Select } from '@sellgar/kit';
import type { CurrencyEntity } from '@library/domain';
import type { IFormData } from '../../../../../../form.schema.ts';
import s from './default.module.css';

interface IProps {
  offerIndex: number;
  index: number;
  currencies: CurrencyEntity[];
}

export const Price: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  return (
    <Field>
      <Field.Label>
        <Label label={'Цена'} />
      </Field.Label>
      <Field.Content>
        <div className={s.price}>
          <div className={s['price-field']}>
            <Controller
              name={`offers.${props.offerIndex}.records.${props.index}.currentPrice.value`}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Field>
                    <Field.Content>
                      <InputAmount2
                        {...field}
                        aria-label={'Сумма'}
                        target={error?.message ? 'destructive' : undefined}
                        value={field.value ? Number(field.value) : undefined}
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
          <div className={s['price-field']}>
            <Controller
              name={`offers.${props.offerIndex}.records.${props.index}.currentPrice.currencyCode`}
              control={control}
              render={({ field, fieldState: { error } }) => {
                return (
                  <Field>
                    <Field.Content>
                      <Select
                        {...field}
                        aria-label={'Валюта'}
                        options={props.currencies}
                        optionKey={'code'}
                        optionValue={'code'}
                        onBlur={field.onBlur}
                        onChange={(value) => field.onChange(value ?? '')}
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
        </div>
      </Field.Content>
    </Field>
  );
};
