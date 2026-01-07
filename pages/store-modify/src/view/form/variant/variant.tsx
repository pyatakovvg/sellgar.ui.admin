import { Field, Label, Caption, Select } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { useVariants } from '../../../hooks/variants.hook.ts';

import { ValueTemplate } from './value-template';
import { OptionTemplate } from './option-template';

import s from './default.module.scss';

export const Variant: React.FC = () => {
  const variants = useVariants();

  const { control } = useFormContext();

  return (
    <div className={s.wrappper}>
      <div className={s.fields}>
        <div className={s.field}>
          <Controller
            name={'variantUuid'}
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <Field>
                  <Field.Label>
                    <Label label={'Товар'} />
                  </Field.Label>
                  <Field.Content>
                    <Select
                      {...field}
                      fixHeight={false}
                      options={variants}
                      optionKey={'uuid'}
                      optionValue={'name'}
                      templateValue={(option) => {
                        if (!option) {
                          return null;
                        }
                        return <ValueTemplate {...option} />;
                      }}
                      templateOption={(option) => {
                        return <OptionTemplate {...option} />;
                      }}
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
      </div>
    </div>
  );
};
