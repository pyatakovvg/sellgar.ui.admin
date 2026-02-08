import * as ReactRouter from 'react-router-dom';

import { useLocation } from '../../location';
import { createHashFromObject } from './hash.utils.ts';

export const useHash = () => {
  const location = useLocation();
  const locationReactRouter = ReactRouter.useLocation();
  const navigate = ReactRouter.useNavigate();

  return (to: Record<string, any>, options?: Omit<ReactRouter.NavigateOptions, 'replace' | 'viewTransition'>) => {
    const newHash = createHashFromObject({ ...location.hash, ...to });

    if (newHash === '') {
      return window.history.replaceState(
        locationReactRouter.state,
        '',
        locationReactRouter.pathname + locationReactRouter.search,
      );
    }

    return navigate(`#${newHash}`, {
      ...options,
      replace: true,
      viewTransition: true,
    });
  };
};
