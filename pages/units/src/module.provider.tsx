import React from 'react';

import { Provider } from './module.context.ts';
import { controller } from './classes/classes.di.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        controller: controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
