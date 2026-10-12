import { Divider, Field, Label, Caption, Input } from '@sellgar/kit';
import { InformationLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import s from './default.module.css';

export const Base = () => {
  const { control } = useFormContext();

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Основные'} />
      <div className={s.content}>
        <Controller
          control={control}
          name={'name'}
          render={({ field, fieldState: { error } }) => (
            <Field>
              <Field.Label>
                <Label label={'Наименование'} required={true} />
              </Field.Label>
              <Field.Content>
                <Input target={error ? 'destructive' : undefined} {...field} />
              </Field.Content>
              {error && (
                <Field.Caption>
                  <Caption state={'destructive'} leadIcon={<InformationLineIcon />} caption={error.message} />
                </Field.Caption>
              )}
            </Field>
          )}
        />
      </div>
    </div>
  );
};
