import { Heading, Underlay } from '@library/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInForm, type IFormValues } from './Form';

import { useSignInRequest } from '../hooks/sign-in-request.hook.ts';

import s from './default.module.scss';

export const SignInView = () => {
  const navigate = useNavigate();
  const signInRequest = useSignInRequest();

  const handleSubmit = async (values: IFormValues) => {
    const result = await signInRequest(values.email, values.password);

    if (result) {
      navigate('/');
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Underlay>
          <div className={s.content}>
            <div className={s.header}>
              <Heading variant={'H3'}>Авторизация</Heading>
            </div>
            <div className={s.form}>
              <SignInForm inProcess={false} onSubmit={handleSubmit} />
            </div>
          </div>
        </Underlay>
      </div>
    </div>
  );
};
