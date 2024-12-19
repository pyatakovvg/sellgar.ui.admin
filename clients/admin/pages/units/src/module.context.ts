import React from 'react';

import { UnitsController } from './classes/controller/units.controller.ts';

interface IContext {
  controller: UnitsController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
