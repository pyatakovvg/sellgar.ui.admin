import React from 'react';
import { createWidget } from '@library/app';

import { WidgetView } from './view';
import { Provider } from './widget.context.tsx';
import { containerModule } from './classes/classes.di.ts';
import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

interface IProps {
  uuid?: string;
  onCancel(): void;
  onSuccess(): void;
}

const WidgetFactory = createWidget({
  containerModule,
  controller: [CategoryControllerInterface],
  view: <WidgetView />,
});

export const Widget: React.FC<IProps> = (props) => {
  return (
    <Provider value={{ uuid: props.uuid, onCancel: props.onCancel, onSuccess: props.onSuccess }}>
      <WidgetFactory />
    </Provider>
  );
};
