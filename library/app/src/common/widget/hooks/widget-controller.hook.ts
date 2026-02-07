import React from 'react';
import { ServiceIdentifier } from 'inversify';

import { WidgetControllersContext } from '../widget-controllers.context.ts';

export const useWidgetController = <T>(controllerId: ServiceIdentifier<T>): T => {
  const controllers = React.useContext(WidgetControllersContext);

  if (!controllers) {
    throw new Error(
      'Widget controllers context is missing. useWidgetController must be used inside createWidget view.',
    );
  }

  if (!controllers.has(controllerId)) {
    throw new Error('Widget controller is not registered in createWidget options.');
  }

  return controllers.get(controllerId) as T;
};
