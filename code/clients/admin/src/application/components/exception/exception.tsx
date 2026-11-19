import { UnauthorizedException } from '@sellgar/app';
import { SignInRoute } from '@library/route-tokens';
import { useException, useNavigate } from '@sellgar/app/react';

import React from 'react';

import { Default } from './default';
import { Validation } from './validation';

export const Exception: React.FC = () => {
  const exception = useException();
  const error = exception.cause;

  if (error instanceof UnauthorizedException) {
    return <RedirectToSignIn />;
  }

  if (Array.isArray(error)) {
    return <Validation errors={error} />;
  }
  return <Default error={exception.error} />;
};

const RedirectToSignIn: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    void navigate.to(SignInRoute, { replace: true });
  }, [navigate]);

  return null;
};

export const Failed: React.FC = () => {
  const exception = useException();

  return <Default error={exception.error} />;
};
