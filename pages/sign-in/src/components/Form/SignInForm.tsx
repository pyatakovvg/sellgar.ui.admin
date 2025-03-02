import { Field } from '@library/kit';
import { Button, Input } from '@sellgar/kit';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from './schema.ts';

import s from './default.module.scss';

export interface IFormValues {
  email: string;
  password: string;
}

interface IFormProps {
  inProcess: boolean;
  onSubmit(event: IFormValues): void;
}

export const SignInForm: React.FC<IFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    resolver: yupResolver<IFormValues>(schema, { abortEarly: false }),
  });

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div className={s.content}>
        <div className={s.row}>
          <Field error={errors.email?.message}>
            <Input
              {...register('email')}
              leadicon={'at-line'}
              size={'md'}
              autoFocus
              type={'phone'}
              name={'email'}
              placeholder={'Email'}
              disabled={props.inProcess}
            />
          </Field>
        </div>
        <div className={s.row}>
          <Field error={errors.password?.message}>
            <Input
              {...register('password')}
              leadicon={'lock-2-line'}
              size={'md'}
              type={'password'}
              name={'password'}
              placeholder={'Пароль'}
              disabled={props.inProcess}
            />
          </Field>
        </div>
      </div>
      <div className={s.control}>
        <Button style={'primary'} size={'md'}>
          Войти
        </Button>
      </div>
    </form>
  );
};
