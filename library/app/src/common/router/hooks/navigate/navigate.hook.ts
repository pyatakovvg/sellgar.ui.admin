import { useHash } from './hash';
import { useSearch } from './search';
import { useReplace } from './replace';
import { useLocation } from './location';

export const useNavigate = () => {
  const hashParams = useHash();
  const searchParams = useSearch();
  const replace = useReplace();
  const location = useLocation();

  return { hashParams, searchParams, replace, location };
};
