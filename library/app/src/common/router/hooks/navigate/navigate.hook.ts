import { useReplace } from './replace';
import { useLocation } from './location';

export const useNavigate = () => {
  const replace = useReplace();
  const location = useLocation();

  return { replace, location };
};
