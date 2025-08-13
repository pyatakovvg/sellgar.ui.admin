import React from 'react';

import { LogoutControllerInterface } from './classes/controller/logout-controller.interface.ts';

interface IProps {
  controller: LogoutControllerInterface;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
