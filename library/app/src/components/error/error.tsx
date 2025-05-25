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
        <h3>Что-то пошло не так!</h3>
      </div>
      <div className={s.message}>
        <h4>{error.message}</h4>
      </div>
      <div className={s.stack}>
        <div className={s.content}>
          <p>
            <code className={s.code}>{error.stack}</code>
          </p>
        </div>
      </div>
    </div>
  );
};
