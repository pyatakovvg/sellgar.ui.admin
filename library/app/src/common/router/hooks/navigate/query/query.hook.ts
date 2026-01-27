import React from 'react';
import { useSearchParams } from 'react-router-dom';

type ParamValue = string | number | boolean | object | null | undefined;
type QueryParams = Record<string, ParamValue | ParamValue[]>;

export interface SetParamsOptions {
  merge?: boolean;
  clearUndefined?: boolean;
}

export const useQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getAllParams = React.useCallback((): QueryParams => {
    const params: QueryParams = {};

    searchParams.forEach((value, key) => {
      try {
        const decodedValue = decodeURIComponent(value);

        if (
          (decodedValue.startsWith('[') && decodedValue.endsWith(']')) ||
          (decodedValue.startsWith('{') && decodedValue.endsWith('}'))
        ) {
          try {
            params[key] = JSON.parse(decodedValue);
          } catch {
            params[key] = decodedValue;
          }
        } else {
          // Пытаемся определить тип
          if (decodedValue === 'true') params[key] = true;
          else if (decodedValue === 'false') params[key] = false;
          else if (!isNaN(Number(decodedValue)) && decodedValue.trim() !== '') {
            params[key] = Number(decodedValue);
          } else {
            params[key] = decodedValue;
          }
        }
      } catch {
        params[key] = value;
      }
    });

    return params;
  }, [searchParams]);

  const getParam = React.useCallback(
    <T = any>(key: string, defaultValue: T = null as T): T => {
      const value = searchParams.get(key);

      if (value === null) return defaultValue;

      try {
        const decodedValue = decodeURIComponent(value);

        if (
          (decodedValue.startsWith('[') && decodedValue.endsWith(']')) ||
          (decodedValue.startsWith('{') && decodedValue.endsWith('}'))
        ) {
          try {
            return JSON.parse(decodedValue) as T;
          } catch {
            return decodedValue as T;
          }
        }

        // Автоматическое определение типа
        if (decodedValue === 'true') return true as T;
        if (decodedValue === 'false') return false as T;
        if (!isNaN(Number(decodedValue)) && decodedValue.trim() !== '') {
          return Number(decodedValue) as T;
        }

        return decodedValue as T;
      } catch {
        return value as T;
      }
    },
    [searchParams],
  );

  const setParams = React.useCallback(
    (params: QueryParams, options: SetParamsOptions = {}) => {
      const newParams = new URLSearchParams(searchParams);
      const { merge = true, clearUndefined = true } = options;

      if (!merge) {
        searchParams.forEach((_, key) => newParams.delete(key));
      }

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined) {
          if (clearUndefined) {
            newParams.delete(key);
          }
          return;
        }

        if (Array.isArray(value)) {
          newParams.delete(key);
          value.forEach((item) => {
            if (item !== null && item !== undefined) {
              const encodedValue = encodeURIComponent(typeof item === 'object' ? JSON.stringify(item) : String(item));
              newParams.append(key, encodedValue);
            }
          });
        } else {
          let stringValue: string;

          if (typeof value === 'object') {
            stringValue = encodeURIComponent(JSON.stringify(value));
          } else if (typeof value === 'boolean') {
            stringValue = encodeURIComponent(value.toString());
          } else {
            stringValue = encodeURIComponent(String(value));
          }

          newParams.set(key, stringValue);
        }
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const setParam = React.useCallback(
    (key: string, value: ParamValue) => {
      setParams({ [key]: value }, { merge: true });
    },
    [setParams],
  );

  const removeParam = React.useCallback(
    (key: string) => {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete(key);
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const clearParams = React.useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const getArrayParam = React.useCallback(
    <T = any>(key: string, defaultValue: T[] = []): T[] => {
      const values = searchParams.getAll(key);

      if (values.length === 0) return defaultValue;

      return values.map((value) => {
        try {
          const decodedValue = decodeURIComponent(value);
          if (
            (decodedValue.startsWith('[') && decodedValue.endsWith(']')) ||
            (decodedValue.startsWith('{') && decodedValue.endsWith('}'))
          ) {
            try {
              return JSON.parse(decodedValue) as T;
            } catch {
              return decodedValue as T;
            }
          }
          return decodedValue as T;
        } catch {
          return value as T;
        }
      });
    },
    [searchParams],
  );

  return React.useMemo(
    () => ({
      getParam,
      setParam,
      setParams,
      getAllParams,
      removeParam,
      clearParams,
      getArrayParam,
      rawParams: searchParams,
      queryString: searchParams.toString(),
    }),
    [getParam, setParam, setParams, getAllParams, removeParam, clearParams, getArrayParam, searchParams],
  );
};
