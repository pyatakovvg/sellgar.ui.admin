import { Button, Input, Icon, Text, Description, Field } from '@library/kit';

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
        <div className={s.head}>
          <Text>Введите данные выданные вашим администрацией или полученные по почте</Text>
        </div>
        <div className={s.row}>
          <Field error={errors.email?.message}>
            <Input
              {...register('email')}
              leftIcon={<Icon icon={'alternate_email'} size={20} />}
              autoFocus
              type={'email'}
              name={'email'}
              placeholder={'Email'}
            />
          </Field>
        </div>
        <div className={s.row}>
          <Field error={errors.password?.message}>
            <Input
              {...register('password')}
              leftIcon={<Icon icon={'lock_outline'} size={20} />}
              type={'password'}
              name={'password'}
              placeholder={'Пароль'}
            />
          </Field>
        </div>
      </div>
      <div className={s.description}>
        <Description>Убедитесь в правильности введенных данных и держите их в полном секрете</Description>
      </div>
      <div className={s.control}>
        <Button inProcess={props.inProcess}>Войти</Button>
      </div>
    </form>
  );
};
