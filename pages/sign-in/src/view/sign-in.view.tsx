import { Container } from '@sellgar/kit';

import React from 'react';

import { Header } from './header';
import { Form } from './form';

import s from './default.module.scss';

export const SignInView: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Container>
          <div className={s.content}>
            <div className={s.header}>
              <Header />
            </div>
            <div className={s.form}>
              <Form />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
