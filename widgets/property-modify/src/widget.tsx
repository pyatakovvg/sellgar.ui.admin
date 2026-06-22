import React from 'react';
import { UseBindings, Widget as WidgetDeclaration, WidgetDefinition, WidgetHost } from '@tiyn/app';

import { WidgetView } from './view';
import { Provider, type PropertyModifyWidgetProps } from './widget.context.tsx';
import { PropertyModifyBindings } from './classes/classes.di.ts';

@UseBindings(PropertyModifyBindings)
@WidgetDeclaration<PropertyModifyWidgetProps>({
  view: WidgetView,
})
class PropertyModifyWidget extends WidgetDefinition<PropertyModifyWidgetProps> {}

export const Widget: React.FC<PropertyModifyWidgetProps> = (props) => {
  return (
    <Provider value={props}>
      <WidgetHost token={PropertyModifyWidget} props={props} />
    </Provider>
  );
};
