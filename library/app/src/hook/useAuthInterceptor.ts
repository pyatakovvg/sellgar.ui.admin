import { useNavigate } from 'react-router-dom';

import { HttpException } from '@library/domain';

export const useAuthInterceptor = <T extends Function>(callback: T) => {
  const navigate = useNavigate();

  return {
    intercept: async (...args: any[]) => {
      try {
        await callback(...args);
      } catch (e) {
        if (Array.isArray(e)) {
          console.log(e);
        } else if ((e as HttpException).getStatus() === 401) {
          navigate('/sign-in');
        }
      }
    },
  };
};
