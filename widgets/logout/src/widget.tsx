import React from 'react';

import { UseBindings, Widget as WidgetDeclaration, WidgetDefinition, WidgetHost } from '@sellgar/app';

import { WidgetView } from './view';
import { LogoutBindings } from './classes/classes.di.ts';

@UseBindings(LogoutBindings)
@WidgetDeclaration({
  fallback: <p>loading...</p>,
  view: WidgetView,
})
class LogoutWidget extends WidgetDefinition {}

export const Widget: React.FC = () => {
  return <WidgetHost token={LogoutWidget} />;
};
