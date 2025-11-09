import React from 'react';

import { PropertyModifyControllerInterface } from './classes/controller/property-modify-controller.interface.ts';

interface IProps {
  uuid?: string;
  controller: PropertyModifyControllerInterface;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
