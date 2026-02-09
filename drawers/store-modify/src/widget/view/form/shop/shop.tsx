import { Field, Label, Caption, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useShops } from '../../../hooks/shops.hook.ts';

// import { ValueTemplate } from './value-template';
// import { OptionTemplate } from './option-template';

import { type IFormData } from '../../form.schema.ts';

import s from './default.module.scss';

export const Shop: React.FC = () => {
  const shops = useShops();

  const { control } = useFormContext<IFormData>();

  return (
    <div className={s.wrappper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'shopUuid'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Магазин'} />
                  </Field.Label>
                  <Field.Content>
                    <Select
                      {...field}
                      options={shops}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      // templateValue={(option) => {
                      //   if (!option) {
                      //     return null;
                      //   }
                      //   return <ValueTemplate {...option} />;
                      // }}
                      // templateOption={(option) => {
                      //   return <OptionTemplate {...option} />;
                      // }}
                      onBlur={field.onBlur}
                      onChange={(data) => {
                        field.onChange(data);
                      }}
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
    </div>
  );
};
