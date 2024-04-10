import { useApp } from '@library/app';
import { Heading } from '@library/kit';
import { controller as push } from '@library/push';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm, type IFormValues } from './Form';

import s from './default.module.scss';

export const SignInView = () => {
  const navigate = useNavigate();
  const app = useApp();
  const [inProcess, setProcess] = React.useState(false);

  const handleSubmit = async (values: IFormValues) => {
    try {
      setProcess(true);

      await app.controller.signIn(values.login, values.password);

      navigate(import.meta.env.VITE_PUBLIC_URL + '/');
    } catch (e) {
      push.add({
        variant: 'danger',
        title: 'Ошибка авторизации',
        content: 'Неверная пара логин пароль',
      });
    } finally {
      setProcess(false);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.header}>
          <Heading variant={'h2'}>Авторизация</Heading>
        </div>
        <div className={s.form}>
          <SignInForm inProcess={inProcess} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};
