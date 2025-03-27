import { Spinner, Container } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Loading = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Container>
          <div className={s.spinner}>
            <Spinner />
          </div>
        </Container>
      </div>
    </div>
  );
};
