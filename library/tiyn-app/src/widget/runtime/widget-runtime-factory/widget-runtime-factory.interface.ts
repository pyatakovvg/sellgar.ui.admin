import type { RuntimeProviderContextInterface } from '../../../runtime/provider/runtime-provider';
import type { RuntimeProviderResult } from '../../../runtime/provider/runtime-provider-instance';
import type { RuntimeScope } from '../../../runtime/scope/base';

import type { WidgetConstructor } from '../../declaration/widget';

import type { WidgetRuntime } from '../widget-runtime';

export interface WidgetRuntimeFactoryOptions<TProps extends object = Record<string, never>> {
  readonly ownerScope: RuntimeScope;
  readonly props?: TProps;
  readonly runtimeKey?: string;
}

export interface WidgetPreloadOptions<TProps extends object = Record<string, never>> {
  readonly props?: TProps;
  readonly runtimeKey?: string;
}

export abstract class WidgetRuntimeFactoryInterface {
  abstract create<TProps extends object>(
    widget: WidgetConstructor,
    options: WidgetRuntimeFactoryOptions<TProps>,
  ): WidgetRuntime<TProps>;

  abstract getPrepared<TProps extends object>(
    widget: WidgetConstructor,
    options: WidgetRuntimeFactoryOptions<TProps>,
  ): WidgetRuntime<TProps> | null;

  abstract prepare<TProps extends object>(
    widget: WidgetConstructor,
    options: WidgetRuntimeFactoryOptions<TProps>,
  ): WidgetRuntime<TProps>;

  abstract preload<TProps extends object>(
    context: RuntimeProviderContextInterface<object>,
    widget: WidgetConstructor,
    options?: WidgetPreloadOptions<TProps>,
  ): Promise<RuntimeProviderResult>;

  abstract releasePrepared<TProps extends object>(
    widget: WidgetConstructor,
    options: WidgetRuntimeFactoryOptions<TProps>,
  ): WidgetRuntime<TProps> | null;
}
