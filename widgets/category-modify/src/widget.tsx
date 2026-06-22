import React from 'react';
import { UseBindings, Widget as WidgetDeclaration, WidgetDefinition, WidgetHost } from '@tiyn/app';

import { WidgetView } from './view';
import { Provider, type CategoryModifyWidgetProps } from './widget.context.tsx';
import { CategoryModifyBindings } from './classes/classes.di.ts';

@UseBindings(CategoryModifyBindings)
@WidgetDeclaration<CategoryModifyWidgetProps>({
  view: WidgetView,
})
class CategoryModifyWidget extends WidgetDefinition<CategoryModifyWidgetProps> {}

export const Widget: React.FC<CategoryModifyWidgetProps> = (props) => {
  return (
    <Provider value={props}>
      <WidgetHost token={CategoryModifyWidget} props={props} />
    </Provider>
  );
};
