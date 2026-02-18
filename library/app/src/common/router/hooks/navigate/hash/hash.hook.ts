import * as ReactRouter from 'react-router-dom';

import { useLocation } from '../../location';
import { createHashFromObject } from '../../../../application/classes/services/navigate/utils/hash.utils.ts';

export const useHash = () => {
  const location = useLocation();
  const locationReactRouter = ReactRouter.useLocation();
  const navigate = ReactRouter.useNavigate();

  return (to: Record<string, any>, options?: Omit<ReactRouter.NavigateOptions, 'replace' | 'viewTransition'>) => {
    const currentHash = location.hashParams?.hash ?? {};
    const newHash = createHashFromObject({ ...currentHash, ...to });

    if (newHash === '') {
      return navigate(
        {
          pathname: locationReactRouter.pathname,
          search: locationReactRouter.search,
          hash: '',
        },
        {
          ...options,
          replace: true,
          viewTransition: true,
        },
      );
    }

    return navigate(
      {
        pathname: locationReactRouter.pathname,
        search: locationReactRouter.search,
        hash: `#${newHash}`,
      },
      {
        ...options,
        replace: true,
        viewTransition: true,
      },
    );
  };
};
