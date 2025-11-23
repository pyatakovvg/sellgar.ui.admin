import React from 'react';

import { ControllerInterface } from '../module/controller';

interface IContext {
  controllers: ControllerInterface;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
