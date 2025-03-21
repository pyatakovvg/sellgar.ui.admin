import React from 'react';

import { Provider } from './application.context';
import { controller } from './classes/classes.di.ts';

export const ApplicationProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        presenter: controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
