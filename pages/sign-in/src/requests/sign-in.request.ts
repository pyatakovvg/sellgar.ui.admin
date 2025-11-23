import { useRequest, useNavigate, useController } from '@library/app';

import { SignInControllerInterface } from '../classes/controller/sign-in-controller.interface.ts';

export const useSignInRequest = () => {
  const controller = useController(SignInControllerInterface);
  const navigate = useNavigate();

  return useRequest(async (login: string, password: string) => {
    await controller.signIn(login, password);

    navigate.replace('/');
  });
};
