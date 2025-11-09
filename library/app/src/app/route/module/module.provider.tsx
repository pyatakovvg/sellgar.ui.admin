import React from 'react';

import { Provider } from './module.context.ts';
import { MODULE_METADATA_KEY } from './decorators/module.decorator.ts';
import { IClassModule, IClassModuleArgs } from './module.tsx';

interface IProps<TController = any> {
  instance: new (args: IClassModuleArgs<TController>) => IClassModule<TController>;
}

export const ModuleProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        controller: Reflect.getMetadata(MODULE_METADATA_KEY, props.instance),
      }}
    >
      {props.children}
    </Provider>
  );
};
