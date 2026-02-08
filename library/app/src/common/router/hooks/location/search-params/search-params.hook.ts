import React from 'react';
import * as ReactRouter from 'react-router-dom';

export const useSearchParams = () => {
  const [searchParams] = ReactRouter.useSearchParams();

  return React.useMemo(() => {
    return Object.fromEntries(searchParams.entries());
  }, [searchParams]);
};
