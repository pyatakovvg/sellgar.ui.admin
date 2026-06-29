import React from 'react';
import { useException } from '@tiyn/app';

export const Exception = () => {
  useException();

  return <div>Exeption</div>;
};
