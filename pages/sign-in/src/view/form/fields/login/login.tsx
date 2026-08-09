import { Caption, Field, Input, Label } from '@sellgar/kit';
import { AtLineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import { observer } from 'mobx-react';

import { useInProcess } from '../../../../hooks/in-process.hook';
import type { TFormValues } from '../../schema';

const LoginComponent: React.FC = () => {
  const inProcess = useInProcess();
  const {
    register,
    formState: { errors },
  } = ReactHookForm.useFormContext<TFormValues>();
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
          disabled={inProcess}
        />
      </Field.Content>
      {typeof errorMessage === 'string' && (
        <Field.Caption>
          <Caption state={'destructive'} caption={errorMessage} />
        </Field.Caption>
      )}
    </Field>
  );
};

export const Login = observer(LoginComponent);
