import 'reflect-metadata';

import { describe, expect, it, vi } from 'vitest';

import { Controller } from '../../../controller/contract/controller';

import type { ControllerInterface, ControllerLoaderArgs } from '../../../controller/contract/controller';
import { BindingModuleInterface } from '../../../di/binding/binding-module';
import { Injectable } from '../../../di/injection/decorators';
import { UseBindings } from '../../../di/composition/use-bindings';
import type { BindingRegistryInterface } from '../../../di/binding/binding-registry';
import { GuardInterface } from '../../../guard/contract/guard';
import { GuardRejectedException } from '../../../guard/contract/guard-rejected-exception';
import { UseGuards } from '../../../guard/declaration/use-guards';
import { ApplicationScope, ModuleScope } from '../../../runtime/scope/kind';
import {
  Provider,
  RuntimeProviderInterface,
  type RuntimeProviderContextInterface,
} from '../../../runtime/provider/runtime-provider';
import {
  RuntimeProviderInstance,
  type RuntimeProviderResult,
} from '../../../runtime/provider/runtime-provider-instance';
import { Module } from '../../declaration/module';

import { ModuleRuntime } from './';

interface Deferred<TValue> {
  readonly promise: Promise<TValue>;
  readonly reject: (error: unknown) => void;
  readonly resolve: (value: TValue) => void;
}

const createDeferred = <TValue>(): Deferred<TValue> => {
  let resolve!: (value: TValue) => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<TValue>((innerResolve, innerReject) => {
    resolve = innerResolve;
    reject = innerReject;
  });

  return {
    promise,
    reject,
    resolve,
  };
};

const createLoaderArgs = (signal?: AbortSignal): ControllerLoaderArgs => {
  return {
    params: {},
    request: new Request('https://tiyn-app.test/route', {
      signal,
    }),
  };
};

const waitForMicrotask = async (): Promise<void> => {
  await Promise.resolve();
};

describe('ModuleRuntime', () => {
  it('moves successful navigation from loading to pending and then active', async () => {
    const fixture = createModuleRuntimeFixture();
    const resultPromise = fixture.runtime.load(createLoaderArgs());

    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    const result = await resultPromise;

    expect(result).toEqual({
      actionKeys: expect.any(Map),
      values: expect.any(Map),
    });
    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.runtime.getViewModuleOrNull()).toBe(fixture.runtime.getErrorBoundaryModuleOrNull());

    const pendingModule = fixture.runtime.getViewModuleOrNull();

    fixture.runtime.commit();

    expect(fixture.runtime.getActiveModuleOrNull()).toBe(pendingModule);
    expect(fixture.runtime.getViewModuleOrNull()).toBe(pendingModule);
  });

  it('keeps pending module after loader error until commit', async () => {
    const fixture = createModuleRuntimeFixture({
      loader: async () => {
        throw new Error('Loader завершился с ошибкой.');
      },
    });
    const resultPromise = fixture.runtime.load(createLoaderArgs());

    fixture.moduleDeferred.resolve(fixture.moduleExports);

    await expect(resultPromise).rejects.toThrow('Loader завершился с ошибкой.');

    const pendingModule = fixture.runtime.getErrorBoundaryModuleOrNull();

    expect(pendingModule).not.toBeNull();
    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.dispose).not.toHaveBeenCalled();

    fixture.runtime.commit();

    expect(fixture.runtime.getActiveModuleOrNull()).toBe(pendingModule);
    expect(fixture.dispose).not.toHaveBeenCalled();
  });

  it('blocks controller loader when guard rejects', async () => {
    const fixture = createModuleRuntimeFixture({
      guard: false,
    });
    const resultPromise = fixture.runtime.load(createLoaderArgs());

    fixture.moduleDeferred.resolve(fixture.moduleExports);

    await expect(resultPromise).rejects.toBeInstanceOf(GuardRejectedException);
    expect(fixture.guard).toHaveBeenCalledTimes(1);
    expect(fixture.loader).not.toHaveBeenCalled();
  });

  it('does not reuse an aborted loading session', async () => {
    const fixture = createModuleRuntimeFixture();
    const abortController = new AbortController();
    const resultPromise = fixture.runtime.load(createLoaderArgs(abortController.signal));

    abortController.abort();
    fixture.moduleDeferred.resolve(fixture.moduleExports);

    await expect(resultPromise).rejects.toThrow('Активация модуля была прервана.');
    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();

    const nextModuleDeferred = createDeferred<Record<string, unknown>>();

    fixture.loadModule.mockReturnValueOnce(nextModuleDeferred.promise);

    const nextResultPromise = fixture.runtime.load(createLoaderArgs());

    nextModuleDeferred.resolve(fixture.moduleExports);

    await nextResultPromise;

    expect(fixture.loadModule).toHaveBeenCalledTimes(2);
    expect(fixture.runtime.getViewModuleOrNull()).not.toBeNull();
  });

  it('disposes pending module when navigation aborts after activation', async () => {
    const loaderDeferred = createDeferred<unknown>();
    const fixture = createModuleRuntimeFixture({
      loader: () => loaderDeferred.promise,
    });
    const abortController = new AbortController();
    const resultPromise = fixture.runtime.load(createLoaderArgs(abortController.signal));

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await vi.waitFor(() => {
      expect(fixture.loader).toHaveBeenCalledTimes(1);
    });

    const pendingModule = fixture.runtime.getViewModuleOrNull();

    expect(pendingModule).not.toBeNull();

    abortController.abort();
    loaderDeferred.reject(new Error('Loader был прерван.'));

    await expect(resultPromise).rejects.toThrow('Loader был прерван.');
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();
    expect(fixture.dispose).toHaveBeenCalledTimes(1);
  });

  it('discards pending module', async () => {
    const fixture = createModuleRuntimeFixture();

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    const pendingModule = fixture.runtime.getErrorBoundaryModuleOrNull();

    expect(pendingModule).not.toBeNull();

    fixture.runtime.discardPending();
    await waitForMicrotask();

    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();
    expect(fixture.dispose).toHaveBeenCalledTimes(1);
  });

  it('does not dispose pending module twice', async () => {
    const fixture = createModuleRuntimeFixture();

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    fixture.runtime.discardPending();
    fixture.runtime.discardPending();
    await waitForMicrotask();

    expect(fixture.dispose).toHaveBeenCalledTimes(1);
  });

  it('waits for pending cleanup during dispose', async () => {
    const disposeDeferred = createDeferred<void>();
    const fixture = createModuleRuntimeFixture({
      dispose: () => disposeDeferred.promise,
    });

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    fixture.runtime.discardPending();

    let isDisposed = false;
    const disposePromise = fixture.runtime.dispose().then(() => {
      isDisposed = true;
    });

    await waitForMicrotask();

    expect(isDisposed).toBe(false);

    disposeDeferred.resolve();
    await disposePromise;

    expect(isDisposed).toBe(true);
    expect(fixture.dispose).toHaveBeenCalledTimes(1);
  });

  it('disposes active module', async () => {
    const fixture = createModuleRuntimeFixture();

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());
    fixture.runtime.commit();

    await fixture.runtime.dispose();

    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();
    expect(fixture.dispose).toHaveBeenCalledTimes(1);
  });

  it('disposes pending module', async () => {
    const fixture = createModuleRuntimeFixture();

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    await fixture.runtime.dispose();

    expect(fixture.runtime.getActiveModuleOrNull()).toBeNull();
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();
    expect(fixture.dispose).toHaveBeenCalledTimes(1);
  });

  it('reports controller dispose errors', async () => {
    const fixture = createModuleRuntimeFixture({
      dispose: () => {
        throw new Error('Dispose завершился с ошибкой.');
      },
    });
    const onError = vi.fn();

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    await fixture.runtime.disposeWithReporter(onError);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error);
    expect((onError.mock.calls[0]?.[0] as Error).message).toBe('Dispose завершился с ошибкой.');
  });

  it('runs providers around controller loaders', async () => {
    const order: string[] = [];
    const fixture = createModuleRuntimeFixture({
      beforeLoad: (context) => {
        expect(context.phase).toBe('beforeLoad');
        expect(context.scope).toBeInstanceOf(ModuleScope);
        expect(context.signal).toBe(context.request.signal);
        order.push('beforeLoad');
      },
      beforeRender: (context) => {
        expect(context.phase).toBe('beforeRender');
        expect(context.scope).toBeInstanceOf(ModuleScope);
        expect(context.signal).toBe(context.request.signal);
        order.push('beforeRender');
      },
      loader: () => {
        order.push('loader');
        return 'loader-data';
      },
    });

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    expect(order).toEqual(['beforeLoad', 'loader', 'beforeRender']);
  });

  it('disposes controllers, providers and then module scope', async () => {
    const order: string[] = [];
    const disposeScope = vi.spyOn(ModuleScope.prototype, 'dispose').mockImplementation(() => {
      order.push('scope');
    });
    const fixture = createModuleRuntimeFixture({
      dispose: () => {
        order.push('controller');
      },
      providerDispose: () => {
        order.push('provider');
      },
    });

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());
    fixture.runtime.commit();

    await fixture.runtime.dispose();

    expect(order).toEqual(['controller', 'provider', 'scope']);
    disposeScope.mockRestore();
  });

  it('reports provider beforeLoad errors', async () => {
    const error = new Error('beforeLoad провайдера завершился с ошибкой.');
    const reporter = {
      cleanup: vi.fn(),
      providerBeforeLoad: vi.fn(),
    };
    const fixture = createModuleRuntimeFixture({
      beforeLoad: () => {
        throw error;
      },
    });

    fixture.moduleDeferred.resolve(fixture.moduleExports);

    await expect(fixture.runtime.load(createLoaderArgs(), reporter)).rejects.toThrow(
      'beforeLoad провайдера завершился с ошибкой.',
    );
    expect(reporter.providerBeforeLoad).toHaveBeenCalledWith(error);
    expect(reporter.cleanup).not.toHaveBeenCalled();
  });

  it('reports provider beforeRender errors', async () => {
    const error = new Error('beforeRender провайдера завершился с ошибкой.');
    const reporter = {
      cleanup: vi.fn(),
      providerBeforeRender: vi.fn(),
    };
    const fixture = createModuleRuntimeFixture({
      beforeRender: () => {
        throw error;
      },
    });

    fixture.moduleDeferred.resolve(fixture.moduleExports);

    await expect(fixture.runtime.load(createLoaderArgs(), reporter)).rejects.toThrow(
      'beforeRender провайдера завершился с ошибкой.',
    );
    expect(reporter.providerBeforeRender).toHaveBeenCalledWith(error);
    expect(reporter.cleanup).not.toHaveBeenCalled();
  });

  it('disposes pending module when navigation aborts during provider phase', async () => {
    const beforeLoadDeferred = createDeferred<void>();
    const providerDispose = vi.fn();
    const fixture = createModuleRuntimeFixture({
      beforeLoad: async () => {
        await beforeLoadDeferred.promise;

        return new RuntimeProviderInstance(() => providerDispose());
      },
    });
    const abortController = new AbortController();
    const resultPromise = fixture.runtime.load(createLoaderArgs(abortController.signal));

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await vi.waitFor(() => {
      expect(fixture.beforeLoad).toHaveBeenCalledTimes(1);
    });

    expect(fixture.runtime.getViewModuleOrNull()).not.toBeNull();

    abortController.abort();
    beforeLoadDeferred.resolve();

    await expect(resultPromise).rejects.toThrow('Активация модуля была прервана.');
    expect(fixture.runtime.getViewModuleOrNull()).toBeNull();
    expect(providerDispose).toHaveBeenCalledTimes(1);
  });

  it('reports provider dispose errors', async () => {
    const error = new Error('Dispose провайдера завершился с ошибкой.');
    const reporter = {
      cleanup: vi.fn(),
      providerDispose: vi.fn(),
    };
    const fixture = createModuleRuntimeFixture({
      providerDispose: () => {
        throw error;
      },
    });

    fixture.moduleDeferred.resolve(fixture.moduleExports);
    await fixture.runtime.load(createLoaderArgs());

    await fixture.runtime.disposeWithReporter(reporter);

    expect(reporter.providerDispose).toHaveBeenCalledWith(error);
    expect(reporter.cleanup).not.toHaveBeenCalled();
  });
});

interface ModuleRuntimeFixtureOptions {
  readonly beforeLoad?: (
    context: RuntimeProviderContextInterface,
  ) => RuntimeProviderResult | Promise<RuntimeProviderResult>;
  readonly beforeRender?: (
    context: RuntimeProviderContextInterface,
  ) => RuntimeProviderResult | Promise<RuntimeProviderResult>;
  readonly dispose?: () => void | Promise<void>;
  readonly guard?: boolean;
  readonly loader?: (args: ControllerLoaderArgs) => unknown | Promise<unknown>;
  readonly providerDispose?: () => void | Promise<void>;
}

interface ModuleRuntimeFixture {
  readonly beforeLoad: ReturnType<typeof vi.fn>;
  readonly beforeRender: ReturnType<typeof vi.fn>;
  readonly dispose: ReturnType<typeof vi.fn>;
  readonly guard: ReturnType<typeof vi.fn>;
  readonly loader: ReturnType<typeof vi.fn>;
  readonly loadModule: ReturnType<typeof vi.fn>;
  readonly moduleDeferred: Deferred<Record<string, unknown>>;
  readonly moduleExports: Record<string, unknown>;
  readonly providerDispose: ReturnType<typeof vi.fn>;
  readonly runtime: ModuleRuntime;
}

const createModuleRuntimeFixture = (options: ModuleRuntimeFixtureOptions = {}): ModuleRuntimeFixture => {
  const beforeLoad = vi.fn(options.beforeLoad ?? (() => {}));
  const beforeRender = vi.fn(options.beforeRender ?? (() => {}));
  const dispose = vi.fn(options.dispose ?? (() => {}));
  const guard = vi.fn(() => options.guard ?? true);
  const loader = vi.fn(options.loader ?? (() => 'loader-data'));
  const providerDispose = vi.fn(options.providerDispose ?? (() => {}));

  abstract class TestControllerInterface implements ControllerInterface {
    abstract dispose(): void | Promise<void>;

    abstract loader(args: ControllerLoaderArgs): unknown | Promise<unknown>;
  }

  abstract class TestGuardInterface extends GuardInterface<ControllerLoaderArgs> {}

  @Injectable()
  class TestGuard extends TestGuardInterface {
    execute(): boolean {
      return guard();
    }
  }

  @Controller()
  class TestController extends TestControllerInterface {
    dispose(): void | Promise<void> {
      return dispose();
    }

    @UseGuards(TestGuardInterface)
    loader(args: ControllerLoaderArgs): unknown | Promise<unknown> {
      return loader(args);
    }
  }

  @Provider()
  abstract class TestProviderInterface extends RuntimeProviderInterface {}

  @Injectable()
  class TestProvider extends TestProviderInterface {
    beforeLoad(context: RuntimeProviderContextInterface): RuntimeProviderResult | Promise<RuntimeProviderResult> {
      return beforeLoad(context);
    }

    beforeRender(context: RuntimeProviderContextInterface): RuntimeProviderInstance | Promise<RuntimeProviderInstance> {
      beforeRender(context);

      return new RuntimeProviderInstance(providerDispose);
    }
  }

  class TestBindings extends BindingModuleInterface {
    register(registry: BindingRegistryInterface): void {
      registry.bind(TestControllerInterface).to(TestController).inSingletonScope();
      registry.bind(TestGuardInterface).to(TestGuard).inSingletonScope();
      registry.bind(TestProviderInterface).to(TestProvider).inSingletonScope();
    }
  }

  const View = (): null => null;

  @UseBindings(TestBindings)
  @Module({
    providers: [TestProviderInterface],
    view: View,
  })
  class TestModule {}

  const moduleDeferred = createDeferred<Record<string, unknown>>();
  const moduleExports = {
    TestModule,
  };
  const loadModule = vi.fn(() => moduleDeferred.promise);
  const runtime = new ModuleRuntime(new ApplicationScope(), loadModule);

  return {
    beforeLoad,
    beforeRender,
    dispose,
    guard,
    loader,
    loadModule,
    moduleDeferred,
    moduleExports,
    providerDispose,
    runtime,
  };
};
