import { Caption, Field, Input, Label } from '@sellgar/kit';
import { AtLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import type { SignInInput } from '../../../../classes/controller/sign-in/input/sign-in.input.ts';

export const Login: React.FC = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = ReactHookForm.useFormContext<SignInInput>();
  const errorMessage = errors.login?.message;

  return (
    <Field>
      <Field.Label>
        <Label label={'Email'} />
      </Field.Label>
      <Field.Content>
        <Input
          {...register('login')}
          leadIcon={<AtLineIcon />}
          size={'md'}
          autoFocus={true}
          type={'email'}
          autoComplete={'email'}
          placeholder={'Email'}
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
