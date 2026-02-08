import React from 'react';

import { useUrlChange } from './url-change.hook.ts';
import { parseHashToObject } from '../../navigate/hash/hash.utils.ts';

export const useHash = () => {
  const [hash, setHash] = React.useState(() => parseHashToObject(location.hash));

  useUrlChange((location: any) => {
    setHash(parseHashToObject(location.hash));
  }, []);

  return hash;
};
