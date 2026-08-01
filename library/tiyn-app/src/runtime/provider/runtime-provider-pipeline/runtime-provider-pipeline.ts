import type { DependencyToken } from '../../../di/token/dependency-token';
import type { RuntimeScope } from '../../scope/base';
import { ProviderScope, type ProviderScopeInstance, type SingletonProviderScopeInstance } from '../../scope/kind';
import type { ProviderToken } from '../provider-token.ts';
import type {
  RuntimeProviderCleanup,
  RuntimeProviderContextInterface,
  RuntimeProviderInterface,
  RuntimeProviderPhase,
  RuntimeProviderResult,
} from '../runtime-provider';
import { isRuntimeProviderToken } from '../runtime-provider';
import { isSingletonProviderToken, type SingletonProviderInterface } from '../singleton-provider';

export type RuntimeProviderPipelineContext<TProps extends object = object> = Omit<
  RuntimeProviderContextInterface<TProps>,
  'phase'
>;

export class RuntimeProviderPipeline<TProps extends object = object> {
  private readonly providerCleanups: RuntimeProviderCleanup[] = [];
  private readonly providerScopeInstances: ProviderScopeInstance<RuntimeProviderInterface<TProps>>[];
  private readonly providers: Map<DependencyToken<RuntimeProviderInterface<TProps>>, RuntimeProviderInterface<TProps>>;
  private readonly singletonProviderScopeInstances: SingletonProviderScopeInstance<SingletonProviderInterface>[];
  private setupPromise: Promise<void> | undefined;
  private disposed = false;

  constructor(scope: RuntimeScope, providerTokens: readonly ProviderToken<TProps>[]) {
    const resolvedProviders = resolveProviders(scope.get(ProviderScope), providerTokens);

    this.providers = resolvedProviders.providers;
    this.providerScopeInstances = resolvedProviders.instances;
    this.singletonProviderScopeInstances = resolvedProviders.singletonInstances;
  }

  get size(): number {
    return this.providers.size + this.singletonProviderScopeInstances.length;
  }

  setup(context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    if (this.disposed) {
      throw new Error('Pipeline runtime providers уже освобождён.');
    }

    this.setupPromise ??= this.runSetup(context);

    return this.setupPromise;
  }

  async dispose(): Promise<readonly PromiseSettledResult<void>[]> {
    if (this.disposed) {
      return [];
    }

    this.disposed = true;
    await this.setupPromise?.catch(() => undefined);

    const providerCleanups = this.providerCleanups.splice(0);
    const providerScopeInstances = this.providerScopeInstances.splice(0);
    const singletonProviderScopeInstances = this.singletonProviderScopeInstances.splice(0);
    const providerResults = await Promise.allSettled(
      providerCleanups.map((cleanup) => {
        return Promise.resolve().then(() => cleanup());
      }),
    );
    const providerScopeResults = await Promise.allSettled(
      providerScopeInstances.map((providerScopeInstance) => {
        return Promise.resolve().then(() => providerScopeInstance.dispose());
      }),
    );
    const singletonProviderScopeResults = await Promise.allSettled(
      singletonProviderScopeInstances.map((providerScopeInstance) => {
        return providerScopeInstance.dispose();
      }),
    );

    return [...providerResults, ...singletonProviderScopeResults, ...providerScopeResults];
  }

  async runBeforeLoad(context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    await this.run('beforeLoad', context);
  }

  async runBeforeRender(context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    await this.run('beforeRender', context);
  }

  private retainProviderResult(result: RuntimeProviderResult): void {
    if (typeof result === 'function') {
      this.providerCleanups.push(result);
    }
  }

  private async runSetup(context: RuntimeProviderPipelineContext<TProps>): Promise<void> {
    await this.run('setup', context);

    for (const providerScopeInstance of this.singletonProviderScopeInstances) {
      await providerScopeInstance.setup();
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

interface ResolvedProviders<TProps extends object> {
  readonly instances: ProviderScopeInstance<RuntimeProviderInterface<TProps>>[];
  readonly providers: Map<DependencyToken<RuntimeProviderInterface<TProps>>, RuntimeProviderInterface<TProps>>;
  readonly singletonInstances: SingletonProviderScopeInstance<SingletonProviderInterface>[];
}

const resolveProviders = <TProps extends object>(
  scope: ProviderScope,
  providerTokens: readonly ProviderToken<TProps>[],
): ResolvedProviders<TProps> => {
  const instances: ProviderScopeInstance<RuntimeProviderInterface<TProps>>[] = [];
  const providers = new Map<DependencyToken<RuntimeProviderInterface<TProps>>, RuntimeProviderInterface<TProps>>();
  const resolvedTokens = new Set<ProviderToken<TProps>>();
  const singletonInstances: SingletonProviderScopeInstance<SingletonProviderInterface>[] = [];

  try {
    for (const providerToken of providerTokens) {
      if (resolvedTokens.has(providerToken)) {
        continue;
      }

      resolvedTokens.add(providerToken);

      if (isRuntimeProviderToken(providerToken)) {
        const runtimeProviderToken = providerToken as DependencyToken<RuntimeProviderInterface<TProps>>;
        const instance = scope.acquire(runtimeProviderToken);

        instances.push(instance);
        providers.set(runtimeProviderToken, instance.value);
        continue;
      }

      if (isSingletonProviderToken(providerToken)) {
        singletonInstances.push(scope.acquireSingleton(providerToken as DependencyToken<SingletonProviderInterface>));
        continue;
      }

      throw new Error(
        `Provider "${getProviderTokenName(providerToken)}" указан в providers metadata, но не помечен декоратором @Provider() или @SingletonProvider().`,
      );
    }
  } catch (error) {
    for (const instance of instances.reverse()) {
      instance.dispose();
    }
    for (const instance of singletonInstances.reverse()) {
      void instance.dispose();
    }

    throw error;
  }

  return { instances, providers, singletonInstances };
};

const getProviderTokenName = <TProps extends object>(providerToken: ProviderToken<TProps>): string => {
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
    case 'setup':
      return provider.setup;
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
