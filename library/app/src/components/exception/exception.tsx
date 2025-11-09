import { UnauthorizedException } from '@library/domain';

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
