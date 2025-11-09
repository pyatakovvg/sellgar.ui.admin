import { HttpException } from '@library/domain';
import { useShowMessage } from '@library/message';
import { UnauthorizedException } from '@library/domain';

import { useNavigate } from './navigate.hook.ts';

export const useRequest = <T extends any[], R>(
  callback: (...args: T) => Promise<R>,
): ((...args: T) => Promise<R | undefined>) => {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  return async (...args: T): Promise<R | undefined> => {
    try {
      return await callback(...args);
    } catch (e) {
      if (e instanceof HttpException) {
        const error = e as HttpException;

        if (error instanceof UnauthorizedException) {
          navigate('/sign-in');
        } else {
          showMessage({
            target: 'destructive',
            autoClose: true,
            timeoutClose: 5,
            title: 'Ошибка',
            content: `Что-то пошло не так`,
          });
        }
      } else if (e instanceof Array) {
        showMessage({
          target: 'destructive',
          autoClose: true,
          timeoutClose: 5,
          title: 'Ошибка',
          content: `Ошибка валидации ответа`,
        });
      }

      throw e;
    }
  };
};
