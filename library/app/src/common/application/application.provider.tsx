import React from 'react';

import { Container } from '../container';
import { Provider } from './application.context.ts';
import { ApplicationControllerInterface } from './classes/controller/application-controller.interface.ts';

interface IProps {
  container: Container;
}

export const ApplicationProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        controller: props.container.getContainer().get(ApplicationControllerInterface),
      }}
    >
      {props.children}
    </Provider>
  );
};
