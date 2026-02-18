import React from 'react';

import { useHashParams } from './hash-params';
import { useSearchParams } from './search-params';

export const useLocation = () => {
  const hashParams = useHashParams();
  const searchParams = useSearchParams();

  return React.useMemo(() => ({ hashParams, searchParams }), [hashParams, searchParams]);
};
