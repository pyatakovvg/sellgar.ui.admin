import { useHash } from './hash';
import { useReplace } from './replace';
import { useLocation } from './location';

export const useNavigate = () => {
  const hash = useHash();
  const replace = useReplace();
  const location = useLocation();

  return { hash, replace, location };
};
