import React from 'react';

import { UnitControllerInterface } from './classes/controller/unit-controller.interface.ts';

interface IProps {
  uuid?: string;
  controller: UnitControllerInterface;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
