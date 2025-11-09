import React from 'react';

import { PropertyGroupModifyControllerInterface } from './classes/controller/property-group-modify-controller.interface.ts';

interface IProps {
  uuid?: string;
  controller: PropertyGroupModifyControllerInterface;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
