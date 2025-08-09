import React from 'react';

import { UnitControllerInterface } from './classes/controller/unit-controller.interface.ts';

interface IContext {
  presenter: UnitControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
