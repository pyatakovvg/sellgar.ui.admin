import React from 'react';

import { PropertyController } from './classes/controller/property.controller.ts';

interface IContext {
  controller: PropertyController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
