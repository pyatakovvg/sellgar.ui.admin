import React from 'react';

import { BrandModifyControllerInterface } from './classes/controller/brand-modify-controller.interface.ts';

interface IProps {
  uuid: string;
  controller: BrandModifyControllerInterface;
  onSuccess(): void;
  onCancel(): void;
}

export const context = React.createContext({} as IProps);
export const Provider = context.Provider;
