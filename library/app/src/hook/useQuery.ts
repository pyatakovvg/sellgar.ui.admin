import { useSearchParams, SetURLSearchParams } from 'react-router-dom';

const normalizeStringToPrimitive = (value: string) => {
  if (/^\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  } else if (/^true|false$/.test(value)) {
    return value === 'true';
  }
  return value;
};

type Obj = { [key: string]: any | any[] };

export const useQuery = <T = {}>(): [T, SetURLSearchParams] => {
  const [filter, setFilter] = useSearchParams();
  const searchParams: Obj = {};

  filter.forEach((_, key, parent) => {
    searchParams[key] = parent.getAll(key).map(normalizeStringToPrimitive);
  });

  Object.keys(searchParams).forEach((key) => {
    if (searchParams[key].length === 1) {
      searchParams[key] = searchParams[key][0];
    } else {
      searchParams[key] = searchParams[key];
    }
  });

  return [searchParams as T, setFilter];
};
