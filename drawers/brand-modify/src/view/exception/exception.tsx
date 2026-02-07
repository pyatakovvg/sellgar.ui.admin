import React from 'react';
import { useAsyncError } from 'react-router-dom';

export const Exception = () => {
  const error = useAsyncError();

  console.log(123, error);

  return <div>Exeption</div>;
};
