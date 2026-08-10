import { UseBindings, Widget, WidgetDefinition } from '@sellgar/app';

import type { ThemeWidgetProps } from './classes/controller/theme/dto/theme-widget-props.dto.ts';
import { ThemeBindings } from './classes/classes.bindings.ts';
import { ThemeProvider } from './providers/theme';

import { WidgetView } from './view/widget.view.tsx';

@UseBindings(ThemeBindings)
@Widget<ThemeWidgetProps>({
  providers: [ThemeProvider],
  view: WidgetView,
})
export class ThemeWidget extends WidgetDefinition<ThemeWidgetProps> {}
