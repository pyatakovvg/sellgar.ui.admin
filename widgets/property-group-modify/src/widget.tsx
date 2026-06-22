import React from 'react';
import { UseBindings, Widget as WidgetDeclaration, WidgetDefinition, WidgetHost } from '@tiyn/app';

import { WidgetView } from './view';
import { Provider, type PropertyGroupModifyWidgetProps } from './widget.context.tsx';
import { PropertyGroupModifyBindings } from './classes/classes.di.ts';

@UseBindings(PropertyGroupModifyBindings)
@WidgetDeclaration<PropertyGroupModifyWidgetProps>({
  view: WidgetView,
})
class PropertyGroupModifyWidget extends WidgetDefinition<PropertyGroupModifyWidgetProps> {}

export const Widget: React.FC<PropertyGroupModifyWidgetProps> = (props) => {
  return (
    <Provider value={props}>
      <WidgetHost token={PropertyGroupModifyWidget} props={props} />
    </Provider>
  );
};
