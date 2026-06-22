import { useNavigate, useController } from '@tiyn/app';

import { LogoutControllerInterface } from '../classes/controller/logout-controller.interface.ts';

export const useLogout = () => {
  const navigate = useNavigate();
  const controller = useController(LogoutControllerInterface);

  return (async () => {
    try {
      await controller.logout();

      navigate.replace('/sign-in');
    } catch (error) {
      throw error;
    }
  });
};
