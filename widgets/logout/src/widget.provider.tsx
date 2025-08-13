import { useLoadContainerModule } from '@library/app';

import React from 'react';

import { Provider } from './widget.context.tsx';
import { create } from './classes/classes.di.ts';

import { LogoutControllerInterface } from './classes/controller/logout-controller.interface.ts';

export const WidgetProvider: React.FC<React.PropsWithChildren> = (props) => {
  const container = useLoadContainerModule(() => create());

  if (!container) {
    return null;
  }

  return (
    <Provider
      value={{
        controller: container.get<LogoutControllerInterface>(LogoutControllerInterface),
      }}
    >
      {props.children}
    </Provider>
  );
};
