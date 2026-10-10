import { Caption, Field, Input, Label } from '@sellgar/kit';
import { Lock2LineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { SignInInput } from '../../../../classes/controller/sign-in/input/sign-in.input.ts';

export const Password: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = ReactHookForm.useFormContext<SignInInput>();
  const errorMessage = errors.password?.message;

  return (
    <Field>
      <Field.Label>
        <Label label={'Пароль'} />
      </Field.Label>
      <Field.Content>
        <Input
          {...register('password')}
          leadIcon={<Lock2LineIcon />}
          size={'md'}
          type={'password'}
          autoComplete={'current-password'}
          placeholder={'Пароль'}
          disabled={isSubmitting}
        />
      </Field.Content>
      {errorMessage && (
        <Field.Caption>
          <Caption state={'destructive'} caption={errorMessage} />
        </Field.Caption>
      )}
    </Field>
  );
};
