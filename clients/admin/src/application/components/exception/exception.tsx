import { UnauthorizedException } from '@library/domain';
import { useException } from '@tiyn/app';

import React from 'react';
import { useRouteError, Navigate } from 'react-router-dom';

import { Default } from './default';
import { Validation } from './validation';

export const Exception: React.FC = () => {
  const error = useRouteError() as Error;

  if (error instanceof UnauthorizedException) {
    return <Navigate to={'/sign-in'} />;
  }

  if (Array.isArray(error)) {
    return <Validation />;
  }
  return <Default error={error} />;
};

export const Failed: React.FC = () => {
  const error = useException();

  return <Default error={normalizeError(error)} />;
};

const normalizeError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  if (typeof error === 'string') {
    return new Error(error);
  }

  if (error === null || error === undefined) {
    return new Error('Unknown application error');
  }

  return new Error(JSON.stringify(error));
};
