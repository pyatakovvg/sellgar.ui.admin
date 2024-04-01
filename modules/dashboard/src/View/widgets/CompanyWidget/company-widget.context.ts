import React from 'react';
import { CompanyWidgetController } from './company-widget.controller.ts';

interface IContext {
  controller: CompanyWidgetController;
}

export const context = React.createContext<IContext>({} as IContext);
export const Provider = context.Provider;
