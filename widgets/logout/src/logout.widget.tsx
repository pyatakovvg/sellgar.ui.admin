import { UseBindings } from '@sellgar/app';
import { Widget, WidgetDefinition } from '@sellgar/app/react';

import { LogoutBindings } from './classes/classes.bindings.ts';

import { WidgetView } from './view/widget.view.tsx';

@UseBindings(LogoutBindings)
@Widget({
  view: WidgetView,
})
export class LogoutWidget extends WidgetDefinition {}
