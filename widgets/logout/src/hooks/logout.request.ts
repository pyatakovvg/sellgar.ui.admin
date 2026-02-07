import { useNavigate, useRequest, useWidgetController } from '@library/app';

import { LogoutControllerInterface } from '../classes/controller/logout-controller.interface.ts';

export const useLogout = () => {
  const navigate = useNavigate();
  const controller = useWidgetController(LogoutControllerInterface);

  return useRequest(async () => {
    try {
      await controller.logout();

      navigate.replace('/sign-in');
    } catch (error) {
      throw error;
    }
  });
};
