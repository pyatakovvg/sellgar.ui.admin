import { HttpException } from '@library/domain';
import { UnauthorizedException } from '@library/domain';

import { useNavigate } from './useNavigate';

export const useRequest = <T extends any, R>(
  callback: (...args: T[]) => Promise<R>,
): ((...args: T[]) => Promise<R>) => {
  const navigate = useNavigate();

  return async (...args: any[]) => {
    try {
      return await callback(...args);
    } catch (e) {
      if (e instanceof HttpException) {
        const error = e as HttpException;

        if (error instanceof UnauthorizedException) {
          navigate('/sign-in');
        }
      }
      throw e;
    }
  };
};
