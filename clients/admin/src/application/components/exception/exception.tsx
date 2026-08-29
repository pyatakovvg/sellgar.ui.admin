import { UnauthorizedException } from '@sellgar/app-v2';
import { SignInRoute } from '@library/route-tokens';
import { useException, useNavigate } from '@sellgar/app-v2/react';

import React from 'react';

import { Default } from './default';
import { Validation } from './validation';

export const Exception: React.FC = () => {
  const error = useException();

  if (error instanceof UnauthorizedException) {
    return <RedirectToSignIn />;
  }

  if (Array.isArray(error)) {
    return <Validation />;
  }
  return <Default error={normalizeError(error)} />;
};

const RedirectToSignIn: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    void navigate.to(SignInRoute, { replace: true });
  }, [navigate]);

  return null;
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
