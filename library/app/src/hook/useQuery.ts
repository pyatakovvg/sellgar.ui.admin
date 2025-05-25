import { useSearchParams, SetURLSearchParams } from 'react-router-dom';

import { searchToObject } from '../utils/search-to-object.utils.ts';

interface IOptions {
  converted?: boolean;
}

export const useQuery = <T = {}>(options: IOptions = { converted: true }): [T, SetURLSearchParams] => {
  const [filter, setFilter] = useSearchParams();
  const searchParams = searchToObject(filter, options);

  return [searchParams as T, setFilter];
};
