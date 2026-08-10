import { UseBindings, Widget, WidgetDefinition } from '@sellgar/app';

import { LogoutBindings } from './classes/classes.bindings.ts';

import { WidgetView } from './view/widget.view.tsx';

@UseBindings(LogoutBindings)
@Widget({
  view: WidgetView,
})
export class LogoutWidget extends WidgetDefinition {}
