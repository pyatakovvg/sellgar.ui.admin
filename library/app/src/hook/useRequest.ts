import { EMode } from '@library/kit';
import { HttpException } from '@library/domain';
import { useShowMessage } from '@library/message';
import { UnauthorizedException } from '@library/domain';

import { useNavigate } from './useNavigate';

export const useRequest = <T, R>(callback: (...args: T[]) => R): ((...args: T[]) => Promise<R | undefined>) => {
  const navigate = useNavigate();
  const showMessage = useShowMessage();

  return async (...args: any[]) => {
    try {
      return await callback(...args);
    } catch (e) {
      if (e instanceof HttpException) {
        const error = e as HttpException;

        if (error instanceof UnauthorizedException) {
          navigate('/sign-in');
        } else {
          const response = error.getResponse() as HttpException;

          showMessage({
            mode: EMode.DANGER,
            autoClose: true,
            timeoutClose: 5,
            title: 'Ошибка',
            content: `${response.message}`,
          });
        }
      } else if (e instanceof Array) {
        showMessage({
          mode: EMode.DANGER,
          autoClose: true,
          timeoutClose: 5,
          title: 'Ошибка',
          content: `Ошибка валидации ответа`,
        });
      }
    }
  };
};
