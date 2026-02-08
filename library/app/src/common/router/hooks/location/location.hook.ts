import React from 'react';

import { useHash } from './hash';
import { useSearchParams } from './search-params';

export const useLocation = () => {
  const hash = useHash();
  const searchParams = useSearchParams();

  return React.useMemo(() => ({ hash, searchParams }), [hash, searchParams]);
};
