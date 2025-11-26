import * as ReactRouter from 'react-router-dom';

import { useLocation } from '../../location';

const createHashFromObject = (object: Record<string, any>) => {
  const objectKeys = Object.keys(object);
  let hash = '';

  for (let key in objectKeys) {
    const parameterKey = objectKeys[key];
    const parameterValue = object[parameterKey];

    switch (typeof parameterValue) {
      case 'object':
        hash += `${parameterKey}(${createHashFromObject(parameterValue)})&`;
        break;
      case 'string':
      case 'number':
        hash += `${parameterKey}=${parameterValue}&`;
        break;
      case 'boolean':
        parameterValue && (hash += `${parameterKey}&`);
        break;
    }
  }
  return hash.replace(/&$/, '');
};

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
