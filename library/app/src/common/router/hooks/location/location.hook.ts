import { useHash } from './hash';

export const useLocation = () => {
  const hash = useHash();

  return { hash };
};
