import React from 'react';
import * as inversify from 'inversify';

import { context } from '../lazy-loader.context.ts';

export const useController = <T>(controller: inversify.ServiceIdentifier<T>): T => {
  const { controllers } = React.useContext(context);

  return controllers.get<T>(controller);
};
