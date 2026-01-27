import { useHash } from './hash';
import { useQuery } from './query';
import { useReplace } from './replace';
import { useLocation } from './location';

export const useNavigate = () => {
  const hash = useHash();
  const query = useQuery();
  const replace = useReplace();
  const location = useLocation();

  return { hash, query, replace, location };
};
