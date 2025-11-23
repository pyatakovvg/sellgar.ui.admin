import { Typography, Container } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { SignInForm, type IFormValues } from './form';

import { useInProcess } from '../hooks/in-process.hook.ts';
import { useSignInRequest } from '../requests/sign-in.request.ts';

import s from './default.module.scss';

export const SignInView = observer(() => {
  const inProcess = useInProcess();

  const signInRequest = useSignInRequest();

  const handleSubmit = async (values: IFormValues) => {
    await signInRequest(values.login, values.password);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Container>
          <div className={s.content}>
            <div className={s.header}>
              <Typography size={'h6'} weight={'semi-bold'}>
                <h6>Авторизация</h6>
              </Typography>
            </div>
            <div className={s.form}>
              <SignInForm inProcess={inProcess} onSubmit={handleSubmit} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
});
