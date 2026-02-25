import React from 'react';
import { createWidget } from '@library/app';

import { WidgetView } from './view';
import { Provider } from './widget.context.tsx';
import { containerModule } from './classes/classes.di.ts';
import { UnitControllerInterface } from './classes/controller/unit-controller.interface.ts';

interface IProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

const WidgetFactory = createWidget({
  containerModule,
  controller: [UnitControllerInterface],
  view: <WidgetView />,
});

export const Widget: React.FC<IProps> = (props) => {
  return (
    <Provider value={{ uuid: props.uuid, onCancel: props.onCancel, onSuccess: props.onSuccess }}>
      <WidgetFactory />
    </Provider>
  );
};
