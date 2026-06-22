import React from 'react';
import { UseBindings, Widget as WidgetDeclaration, WidgetDefinition, WidgetHost } from '@tiyn/app';

import { WidgetView } from './view';
import { Provider, type UnitModifyWidgetProps } from './widget.context.tsx';
import { UnitModifyBindings } from './classes/classes.di.ts';

@UseBindings(UnitModifyBindings)
@WidgetDeclaration<UnitModifyWidgetProps>({
  view: WidgetView,
})
class UnitModifyWidget extends WidgetDefinition<UnitModifyWidgetProps> {}

export const Widget: React.FC<UnitModifyWidgetProps> = (props) => {
  return (
    <Provider value={props}>
      <WidgetHost token={UnitModifyWidget} props={props} />
    </Provider>
  );
};
