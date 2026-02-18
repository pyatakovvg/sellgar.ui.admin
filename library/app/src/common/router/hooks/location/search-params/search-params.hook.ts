import React from 'react';
import * as ReactRouter from 'react-router-dom';
import { ClassConstructor } from 'class-transformer';

import { parseSearchParams } from '../../../../application/classes/services/location/utils/search.utils.ts';
import { createParamsFactorySync } from '../../../../application/classes/services/location/location.service.ts';

export const useSearchParams = () => {
  const location = ReactRouter.useLocation();

  const searchParams = React.useMemo(() => parseSearchParams(location.search), [location.search]);

  return {
    search: searchParams,
    searchToObject<T extends object>(Target: ClassConstructor<T>): T {
      return createParamsFactorySync(Target)(searchParams);
    },
  };
};
