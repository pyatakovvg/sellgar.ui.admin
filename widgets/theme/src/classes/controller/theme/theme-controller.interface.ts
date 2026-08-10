import { WidgetControllerInterface } from '@sellgar/app';
import type { WidgetControllerActionArgs } from '@sellgar/app';

import type { ThemeStoreInterface } from '../../store/theme/theme-store.interface.ts';
import type { ThemeWidgetProps } from './dto/theme-widget-props.dto.ts';
import type { ThemePreferenceInput } from './input/theme-preference.input.ts';

export abstract class ThemeControllerInterface extends WidgetControllerInterface<ThemeWidgetProps> {
  abstract loader(): ThemeStoreInterface;
  abstract action(args: WidgetControllerActionArgs<ThemeWidgetProps, ThemePreferenceInput>): void;
}
