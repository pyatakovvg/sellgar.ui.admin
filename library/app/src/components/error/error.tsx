import { Typography } from '@sellgar/kit';
import { UnauthorizedException } from '@library/domain';

import React from 'react';
import { useRouteError, Navigate } from 'react-router-dom';

import s from './default.module.scss';

export const Error: React.FC = () => {
  const error = useRouteError() as Error;

  if (error instanceof UnauthorizedException) {
    return <Navigate to={'/sign-in'} />;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <p>Что-то пошло не так!</p>
        </Typography>
      </div>
      <div className={s.message}>
        <Typography size={'body-m'} weight={'medium'}>
          <p>{error.message}</p>
        </Typography>
      </div>
      <div className={s.stack}>
        <div className={s.content}>
          <Typography size={'caption-s'} weight={'medium'}>
            <code className={s.code}>{error.stack}</code>
          </Typography>
        </div>
      </div>
    </div>
  );
};
