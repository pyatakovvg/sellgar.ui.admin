import { useRevalidator } from 'react-router-dom';

export const useLoaderRevalidate = () => {
  const { revalidate, state } = useRevalidator();

  return { revalidate, isLoading: state === 'loading' };
};
