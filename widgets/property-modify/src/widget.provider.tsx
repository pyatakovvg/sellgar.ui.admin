import { useLoadContainerModule } from '@library/app';

import React from 'react';

import { Provider } from './widget.context.tsx';
import { containerModule } from './classes/classes.di.ts';

import { PropertyModifyControllerInterface } from './classes/controller/property-modify-controller.interface.ts';

interface IProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

export const WidgetProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const container = useLoadContainerModule(containerModule);

  return (
    <Provider
      value={{
        uuid: props.uuid,
        controller: container.get(PropertyModifyControllerInterface),
        onCancel: props.onCancel,
        onSuccess: props.onSuccess,
      }}
    >
      {props.children}
    </Provider>
  );
};
