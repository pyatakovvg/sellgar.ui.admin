import type { DependencyConstructor } from '../../../di/binding/binding-builder';
import type { DependencyToken } from '../../../di/token/dependency-token';
import type { RuntimeScope } from '../../scope/base';
import { RuntimeProviderInstanceInterface, type RuntimeProviderResult } from '../runtime-provider-instance';
import type {
  RuntimeProviderContextInterface,
  RuntimeProviderInterface,
  RuntimeProviderPhase,
} from '../runtime-provider';
import { isRuntimeProviderToken } from '../runtime-provider';

export type RuntimeProviderPipelineContext<TProps extends object = object> = Omit<
  RuntimeProviderContextInterface<TProps>,
  'phase'
>;

export class RuntimeProviderPipeline<TProps extends object = object> {
  private readonly providerInstances: RuntimeProviderInstanceInterface[] = [];
  private readonly providers: Map<DependencyToken<RuntimeProviderInterface<TProps>>, RuntimeProviderInterface<TProps>>;

  constructor(scope: RuntimeScope, providerTokens: readonly DependencyToken<RuntimeProviderInterface<TProps>>[]) {
    this.providers = resolveProviders(scope, providerTokens);
  }

  get size(): number {
    return this.providers.size;
  }

  async dispose(): Promise<readonly PromiseSettledResult<void>[]> {
    if (this.providerInstances.length === 0) {
      return [];
    }

    const providerInstances = this.providerInstances.splice(0);

    return Promise.allSettled(
      providerInstances.map((providerInstance) => {
        return Promise.resolve().then(() => providerInstance.dispose());
      }),
    );
  }

  async runBeforeLoad(context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    await this.run('beforeLoad', context);
  }

  async runBeforeRender(context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    await this.run('beforeRender', context);
  }

  private retainProviderResult(result: RuntimeProviderResult): void {
    if (result instanceof RuntimeProviderInstanceInterface) {
      this.providerInstances.push(result);
    }
  }

  private async run(phase: RuntimeProviderPhase, context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    const providerContext = {
      ...context,
      phase,
    };

    for (const provider of this.providers.values()) {
      const method = getProviderMethod(provider, phase);

      this.retainProviderResult(await method?.call(provider, providerContext));
    }
  }
}

const resolveProviders = <TProps extends object>(
  scope: RuntimeScope,
  providerTokens: readonly DependencyToken<RuntimeProviderInterface<TProps>>[],
): Map<DependencyToken<RuntimeProviderInterface<TProps>>, RuntimeProviderInterface<TProps>> => {
  const providers = new Map<DependencyToken<RuntimeProviderInterface<TProps>>, RuntimeProviderInterface<TProps>>();

  for (const providerToken of providerTokens) {
    assertRuntimeProviderToken(providerToken);
    bindRuntimeProvider(scope, providerToken);
    providers.set(providerToken, scope.get(providerToken));
  }

  return providers;
};

const assertRuntimeProviderToken = <TProps extends object>(
  providerToken: DependencyToken<RuntimeProviderInterface<TProps>>,
): void => {
  if (isRuntimeProviderToken(providerToken)) {
    return;
  }

  throw new Error(
    `Runtime provider "${getProviderTokenName(providerToken)}" указан в providers metadata, но не помечен декоратором @Provider().`,
  );
};

const bindRuntimeProvider = <TProps extends object>(
  scope: RuntimeScope,
  providerToken: DependencyToken<RuntimeProviderInterface<TProps>>,
): void => {
  if (scope.has(providerToken)) {
    return;
  }

  scope.bindSelf(providerToken as DependencyConstructor<RuntimeProviderInterface<TProps>>);
};

const getProviderTokenName = <TProps extends object>(
  providerToken: DependencyToken<RuntimeProviderInterface<TProps>>,
): string => {
  if (typeof providerToken === 'function') {
    return providerToken.name || 'anonymous';
  }

  return String(providerToken);
};

const getProviderMethod = <TProps extends object>(
  provider: RuntimeProviderInterface<TProps>,
  phase: RuntimeProviderPhase,
) => {
  switch (phase) {
    case 'afterRender':
      return provider.afterRender;
    case 'beforeLoad':
      return provider.beforeLoad;
    case 'beforeRender':
      return provider.beforeRender;
    case 'onDemand':
      return provider.onDemand;
  }
};
