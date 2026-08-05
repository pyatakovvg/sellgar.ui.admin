import { useNavigate, useController } from '@sellgar/app';

import { SignInControllerInterface } from '../classes/controller/sign-in-controller.interface.ts';

export const useSignInRequest = () => {
  const controller = useController(SignInControllerInterface);
  const navigate = useNavigate();

  return (async (login: string, password: string) => {
    await controller.signIn(login, password);

    navigate.replace('/');
  });
};
