import { Button, Input, Icon, Field, Label, Caption } from '@sellgar/kit';

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { schema } from './schema.ts';

import s from './default.module.scss';

export interface IFormValues {
  login: string;
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
    resolver: yupResolver(schema, { abortEarly: false }),
  });

  const onSubmit = handleSubmit(props.onSubmit);

  return (
    <form className={s.wrapper} onSubmit={onSubmit}>
      <div className={s.content}>
        <div className={s.row}>
          <Field>
            <Field.Label>
              <Label label={'Email'} />
            </Field.Label>
            <Field.Content>
              <Input
                {...register('login')}
                leadIcon={<Icon icon={'at-line'} />}
                size={'md'}
                autoFocus
                type={'phone'}
                name={'login'}
                placeholder={'Email'}
                disabled={props.inProcess}
              />
            </Field.Content>
            {errors.login?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={errors.login.message} />
              </Field.Caption>
            )}
          </Field>
        </div>
        <div className={s.row}>
          <Field>
            <Field.Label>
              <Label label={'Пароль'} />
            </Field.Label>
            <Field.Content>
              <Input
                {...register('password')}
                leadIcon={<Icon icon={'lock-2-line'} />}
                size={'md'}
                type={'password'}
                name={'password'}
                placeholder={'Пароль'}
                disabled={props.inProcess}
              />
            </Field.Content>
            {errors.password?.message && (
              <Field.Caption>
                <Caption state={'destructive'} caption={errors.password.message} />
              </Field.Caption>
            )}
          </Field>
        </div>
      </div>
      <div className={s.control}>
        <div className={s.button}>
          <Button style={'primary'}>Войти</Button>
        </div>
        <div className={s.button}>
          <Button style={'ghost'}>Забили пароль?</Button>
        </div>
      </div>
    </form>
  );
};
