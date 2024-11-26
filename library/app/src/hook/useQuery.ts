import { useSearchParams, SetURLSearchParams } from 'react-router-dom';
import React from 'react';

interface IOptions {
  converted?: boolean;
}

const convertStringToPrimitive = (value: string) => {
  if (/^\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  } else if (/^true|false$/.test(value)) {
    return value === 'true';
  }
  return value;
};

type Obj = { [key: string]: any | any[] };

export const useQuery = <T = Obj>(options: IOptions = { converted: true }): [T, SetURLSearchParams] => {
  const searchParams: Obj = {};
  const [filter, setFilter] = useSearchParams();

  filter.forEach((_, key, parent) => {
    if (options.converted) {
      searchParams[key] = parent.getAll(key).map(convertStringToPrimitive);
    } else {
      searchParams[key] = parent.getAll(key);
    }
  });

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key].length === 1) {
      searchParams[key] = searchParams[key][0];
    } else {
      searchParams[key] = searchParams[key];
    }
  });

  return React.useMemo(() => [searchParams as T, setFilter], [filter]);
};
