import { UseBindings } from '@sellgar/app-v2';
import { Widget, WidgetDefinition } from '@sellgar/app-v2/native';

import { SignOutBindings } from './classes/classes.bindings.ts';
import { WidgetView } from './view/widget.view.tsx';

@UseBindings(SignOutBindings)
@Widget({ view: WidgetView })
export class SignOutWidget extends WidgetDefinition {}
