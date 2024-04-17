import { useNavigate } from 'react-router-dom';

import { HttpException } from '@library/infra';

export const useAuthInterceptor = <T extends Function>(callback: T) => {
  const navigate = useNavigate();

  return {
    intercept: async () => {
      try {
        await callback();
      } catch (e) {
        if ((e as HttpException).getStatus() === 401) {
          navigate('/sign-in');
        }
      }
    },
  };
};
