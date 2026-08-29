import { UseBindings } from '@sellgar/app-v2';
import { Widget, WidgetDefinition } from '@sellgar/app-v2/react';

import { LogoutBindings } from './classes/classes.bindings.ts';

import { WidgetView } from './view/widget.view.tsx';

@UseBindings(LogoutBindings)
@Widget({
  view: WidgetView,
})
export class LogoutWidget extends WidgetDefinition {}
