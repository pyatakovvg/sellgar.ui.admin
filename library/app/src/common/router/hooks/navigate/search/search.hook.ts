import React from 'react';
import * as ReactRouter from 'react-router-dom';

export const useSearch = () => {
  const location = ReactRouter.useLocation();
  const navigate = ReactRouter.useNavigate();

  const encodeValue = React.useCallback((value: any) => {
    if (value === null || value === undefined) return null;
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  }, []);

  const applySearch = React.useCallback(
    (params: URLSearchParams) => {
      const search = params.toString();
      const currentHash = window.location.hash || '';

      return navigate(
        {
          pathname: location.pathname,
          search: search ? `?${search}` : '',
          hash: currentHash,
        },
        {
          replace: true,
          viewTransition: true,
        },
      );
    },
    [location.pathname, navigate],
  );

  return {
    deleteParam: (key: string) => {
      const params = new URLSearchParams(location.search);
      params.delete(key);
      return applySearch(params);
    },
    deleteParams: () => {
      return applySearch(new URLSearchParams());
    },
    setParam: (key: string, data: any) => {
      const params = new URLSearchParams(location.search);

      if (data === null || data === undefined || data === '') {
        params.delete(key);
        return applySearch(params);
      }

      if (Array.isArray(data)) {
        params.delete(key);
        data.forEach((item) => {
          const encoded = encodeValue(item);
          if (encoded !== null) params.append(key, encoded);
        });
        return applySearch(params);
      }

      const encoded = encodeValue(data);
      if (encoded === null || encoded === '') {
        params.delete(key);
      } else {
        params.set(key, encoded);
      }

      return applySearch(params);
    },
    setParams: (paramsInput: Record<string, any>) => {
      const params = new URLSearchParams(location.search);

      Object.entries(paramsInput).forEach(([key, data]) => {
        if (data === null || data === undefined || data === '') {
          params.delete(key);
          return;
        }

        if (Array.isArray(data)) {
          params.delete(key);
          data.forEach((item) => {
            const encoded = encodeValue(item);
            if (encoded !== null) params.append(key, encoded);
          });
          return;
        }

        const encoded = encodeValue(data);
        if (encoded === null || encoded === '') {
          params.delete(key);
        } else {
          params.set(key, encoded);
        }
      });

      return applySearch(params);
    },
  };
};
