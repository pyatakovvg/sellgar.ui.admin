import React from 'react';
import { StockController } from './stock.controller.ts';

interface IContext {
  controller: StockController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
