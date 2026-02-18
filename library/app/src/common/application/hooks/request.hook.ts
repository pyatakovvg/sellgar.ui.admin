// import { HttpException } from '@library/domain';
// import { UnauthorizedException } from '@library/domain';
//
// import { useNavigate } from '../../router';

export const useRequest = <T extends any[], R>(callback: (...args: T) => Promise<R>): ((...args: T) => Promise<R>) => {
  // const navigate = useNavigate();

  return async (...args: T): Promise<R> => {
    try {
      return await callback(...args);
    } catch (e) {
      throw e;
      // if (e instanceof HttpException) {
      //   const error = e as HttpException;
      //
      //   if (error instanceof UnauthorizedException) {
      //     navigate.location('/sign-in');
      //   } else {
      //   }
      // } else if (Array.isArray(e)) {
      //
      // }

      throw e;
    }
  };
};
