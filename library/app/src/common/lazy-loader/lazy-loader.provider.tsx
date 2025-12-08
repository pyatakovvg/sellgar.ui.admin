import React from 'react';

import { Provider } from './lazy-loader.context.ts';
import { ControllerInterface } from '../module/controller';

interface IProps {
  controller: ControllerInterface<any>;
}

export const LazyLoaderProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        controller: props.controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
