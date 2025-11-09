import { useAsyncValue } from 'react-router-dom';

export const useAwaitLoaderData = <T = any>(): T => {
  const data = useAsyncValue();

  return data as T;
};
