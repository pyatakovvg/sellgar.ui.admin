import React from 'react';
import * as inversify from 'inversify';

import { context } from '../lazy-loader.context.ts';

export const useController = <T>(controllerIdentifier: inversify.ServiceIdentifier<T>): T => {
  const { controller } = React.useContext(context);

  return controller.get(controllerIdentifier) as T;
};
