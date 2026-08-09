import { Caption, Field, Input, Label } from '@sellgar/kit';
import { Lock2LineIcon } from '@sellgar/kit/icons';

import React from 'react';
import * as ReactHookForm from 'react-hook-form';
import { observer } from 'mobx-react';

import { useInProcess } from '../../../../hooks/in-process.hook';
import type { TFormValues } from '../../schema';

const PasswordComponent: React.FC = () => {
  const inProcess = useInProcess();
  const {
    register,
    formState: { errors },
  } = ReactHookForm.useFormContext<TFormValues>();
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

export const Password = observer(PasswordComponent);
