import React from 'react';

import { PropertyControllerInterface } from './classes/controller/property-controller.interface.ts';

interface IContext {
  controller: PropertyControllerInterface;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
