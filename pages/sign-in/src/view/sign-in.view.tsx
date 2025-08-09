import { Typography, Container } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { SignInForm, type IFormValues } from './form';

import { useSignInRequest } from '../hooks/sign-in-request.hook.ts';
import { useGetFormInProcess } from '../hooks/get-form-in-process.hook.ts';

import s from './default.module.scss';

export const SignInView = observer(() => {
  const navigate = useNavigate();
  const signInRequest = useSignInRequest();
  const inProcess = useGetFormInProcess();

  const handleSubmit = async (values: IFormValues) => {
    const result = await signInRequest(values.login, values.password);

    if (result) {
      navigate('/');
    }
  };

  return (
    <div className={s.wrapper} data-page={'sign-in'}>
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
