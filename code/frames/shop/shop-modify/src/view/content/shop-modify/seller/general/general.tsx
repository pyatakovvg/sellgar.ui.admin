import { Field, Label, Caption, Input, Textarea } from '@sellgar/kit';

import React from 'react';
import { Controller, useFormContext, useFormState } from 'react-hook-form';

import type { ShopFormInput } from '../../../../../classes/controller/shop-modify/input/shop-form.input.ts';

import s from './default.module.css';

export const General: React.FC = () => {
  const { control } = useFormContext<ShopFormInput>();
  const { isSubmitting } = useFormState({ control });

  return (
    <div className={s.wrapper}>
      <Controller
        control={control}
        name={'entrepreneurFullName'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'ФИО предпринимателя'} required={true} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'inn'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'ИНН'} required={true} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'ogrnip'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'ОГРНИП'} required={true} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'registrationAuthority'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Регистрирующий орган'} required={true} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'legalAddress'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Адрес регистрации'} required={true} />
            </Field.Label>
            <Field.Content>
              <Textarea
                {...field}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'actualLocation'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Фактический адрес'} />
            </Field.Label>
            <Field.Content>
              <Textarea
                {...field}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'email'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Электронная почта'} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name={'phone'}
        render={({ field, fieldState: { error } }) => (
          <Field>
            <Field.Label>
              <Label label={'Телефон'} />
            </Field.Label>
            <Field.Content>
              <Input
                {...field}
                size={'xs'}
                value={field.value}
                disabled={isSubmitting}
                target={error?.message ? 'destructive' : undefined}
              />
            </Field.Content>
            {error?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={error.message} />
              </Field.Caption>
            )}
          </Field>
        )}
      />
    </div>
  );
};
