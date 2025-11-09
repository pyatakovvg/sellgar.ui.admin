import React from 'react';

import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

interface IProps {
  uuid?: string;
  controller: CategoryControllerInterface;
  onCancel(): void;
  onSuccess(): void;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
