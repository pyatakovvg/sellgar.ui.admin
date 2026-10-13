import { Caption, Field, Input } from '@sellgar/kit';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { IFormData } from '../../../../../../../form.schema.ts';
import s from './default.module.scss';

interface IProps {
  path: `options.${number}.metadata.${number}`;
  inProcess: boolean;
}
export const Color: React.FC<IProps> = (props) => {
  const { control } = useFormContext<IFormData>();
  const { path, inProcess } = props;
  return (
    <Controller
      name={`${path}.colorValue`}
      control={control}
      disabled={inProcess}
      render={({ field, fieldState: { error } }) => (
        <Field>
          <Field.Content>
            <div className={s.wrapper}>
              <input
                className={s.input}
                type={'color'}
                disabled={inProcess}
                value={/^#[0-9A-Fa-f]{6}$/.test(field.value ?? '') ? (field.value ?? '#000000') : '#000000'}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.currentTarget.value.toUpperCase())}
              />
              <Input
                value={field.value ?? ''}
                target={error?.message ? 'destructive' : undefined}
                size={'md'}
                placeholder={'#RRGGBB'}
                disabled={inProcess}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.currentTarget.value.toUpperCase())}
              />
            </div>
          </Field.Content>
          {error?.message && (
            <Field.Caption>
              <Caption state={'destructive'} caption={error.message} />
            </Field.Caption>
          )}
        </Field>
      )}
    />
  );
};
