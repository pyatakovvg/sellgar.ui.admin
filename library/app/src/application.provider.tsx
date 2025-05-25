import React from 'react';

import { Provider } from './application.context';
import { container } from './classes/container.di.ts';

import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

export const ApplicationProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        controller: container.get(ApplicationControllerInterface),
      }}
    >
      {props.children}
    </Provider>
  );
};
