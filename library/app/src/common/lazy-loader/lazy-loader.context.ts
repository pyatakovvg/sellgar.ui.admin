import React from 'react';

import { ControllerInterface } from '../module/controller';

interface IContext {
  controller: ControllerInterface<any>;
}

export const context = React.createContext({} as IContext);
export const Provider = context.Provider;
