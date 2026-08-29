import type { ControllerArgs, WithPayload, WithProps } from '@sellgar/app-v2';

import type { ThemeStoreInterface } from '../../store/theme/theme-store.interface.ts';
import type { ThemeWidgetProps } from './dto/theme-widget-props.dto.ts';
import type { ThemePreferenceInput } from './input/theme-preference.input.ts';

export abstract class ThemeControllerInterface {
  abstract loader(): ThemeStoreInterface;
  abstract action(
    args: ControllerArgs<WithPayload<ThemePreferenceInput, WithProps<ThemeWidgetProps>>>,
  ): void;
}
