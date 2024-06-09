import { useQuery } from '@library/app';

import React from 'react';
import { useLocation } from 'react-router-dom';

export const useSearchParams = (): any[] => {
  const location = useLocation();
  const [search, setSearchParams] = useQuery();

  return [React.useMemo(() => search, [location]), setSearchParams];
};
