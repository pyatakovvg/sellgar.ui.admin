import type {
  ControllerActionArgs,
  ControllerInterface,
  ControllerLoaderArgs,
} from '../../../controller/contract/controller';
import {
  createControllerActionKey,
  createControllerLoaderData,
  getControllerLoaderData,
  mergeControllerLoaderData,
  type ControllerLoaderData,
} from '../../../controller/data/controller-loader-data';
import type { DependencyToken } from '../../../di/token/dependency-token';
import { executeGuardedMethod } from '../../../guard/runtime/guard-method-executor';
import { ModuleScope } from '../../../runtime/scope/kind';
import {
  RuntimeProviderPipeline,
  type RuntimeProviderPipelineContext,
} from '../../../runtime/provider/runtime-provider-pipeline';
import type { RuntimeScope } from '../../../runtime/scope/base';
import { RevalidateServiceInterface } from '../../../revalidate/contract/revalidate-service';
import { RuntimeRevalidateService } from '../../../revalidate/runtime/revalidate-service';

import { getModuleMetadata, type ModuleConstructor, type ModuleMetadata } from '../../declaration/module';
import { resolveModuleExport } from '../../resolution/module-export-resolver';

export interface ActiveModuleRuntime {
  readonly actionControllers: Map<string, DependencyToken<unknown>>;
  readonly controllers: Map<DependencyToken<unknown>, ControllerInterface>;
  loaderData: ControllerLoaderData;
  loaderParams: Record<string, string | undefined>;
  loaderRequestUrl: string;
  readonly metadata: ModuleMetadata;
  readonly module: ModuleConstructor;
  readonly providerPipeline: RuntimeProviderPipeline;
  readonly scope: ModuleScope;
}

interface ModuleCleanupTask {
  readonly moduleRuntime: ActiveModuleRuntime;
  readonly promise: Promise<void>;
}

export interface ModuleRuntimeReporter {
  readonly cleanup?: (error: unknown) => void;
  readonly providerBeforeLoad?: (error: unknown) => void;
  readonly providerBeforeRender?: (error: unknown) => void;
  readonly providerDispose?: (error: unknown) => void;
  readonly providerSetup?: (error: unknown) => void;
}

export interface ModuleRuntimeRevalidateOptions {
  readonly controllerToken?: DependencyToken<unknown>;
  readonly signal?: AbortSignal;
}

type ModuleRuntimeReporterInput = ((error: unknown) => void) | ModuleRuntimeReporter;
type ModuleRuntimeListener = () => void;

type ModuleRuntimeState =
  | {
      readonly phase: 'empty';
    }
  | {
      readonly active: ActiveModuleRuntime | null;
      readonly phase: 'loading';
      readonly promise: Promise<ActiveModuleRuntime>;
      readonly sessionId: number;
    }
  | {
      readonly active: ActiveModuleRuntime | null;
      readonly pending: ActiveModuleRuntime;
      readonly phase: 'pending';
      readonly sessionId: number;
    }
  | {
      readonly active: ActiveModuleRuntime;
      readonly phase: 'active';
    };

export class ModuleRuntime {
  private readonly cleanupTasks = new Set<ModuleCleanupTask>();
  private readonly disposedModules = new WeakSet<ActiveModuleRuntime>();
  private readonly listeners = new Set<ModuleRuntimeListener>();

  private state: ModuleRuntimeState = { phase: 'empty' };
  private sessionCounter = 0;

  constructor(
    private readonly ownerScope: RuntimeScope,
    private readonly loadModule: () => Promise<Record<string, unknown>>,
  ) {}

  async activate(signal: AbortSignal, reporter?: ModuleRuntimeReporterInput): Promise<ActiveModuleRuntime> {
    const activeModule = this.getActiveModuleOrNull();

    if (activeModule) {
      return activeModule;
    }

    if (this.state.phase === 'pending') {
      return this.state.pending;
    }

    if (this.state.phase === 'loading') {
      return this.state.promise;
    }

    const sessionId = ++this.sessionCounter;
    const active = activeModule;

    const abortPending = (): void => {
      if (!this.isSessionActive(sessionId)) {
        return;
      }

      if (this.state.phase === 'loading' && this.state.sessionId === sessionId) {
        this.state = active ? { active, phase: 'active' } : { phase: 'empty' };

        return;
      }

      this.disposePending(reporter);
    };

    signal.addEventListener('abort', abortPending, { once: true });

    const promise = this.activateModule(signal)
      .then((activeModule) => {
        if (signal.aborted || !this.isSessionActive(sessionId)) {
          this.scheduleModuleDispose(activeModule, reporter);
          throw new Error('Активация модуля была прервана.');
        }

        this.state = {
          active,
          pending: activeModule,
          phase: 'pending',
          sessionId,
        };

        return activeModule;
      })
      .catch((error) => {
        if (this.state.phase === 'loading' && this.state.sessionId === sessionId) {
          this.state = active ? { active, phase: 'active' } : { phase: 'empty' };
        }

        throw error;
      })
      .finally(() => {
        signal.removeEventListener('abort', abortPending);

        if (this.state.phase === 'loading' && this.state.sessionId === sessionId) {
          this.state = active ? { active, phase: 'active' } : { phase: 'empty' };
        }
      });

    this.state = {
      active,
      phase: 'loading',
      promise,
      sessionId,
    };

    return promise;
  }

  getActiveModule(): ActiveModuleRuntime {
    const activeModule = this.getActiveModuleOrNull();

    if (!activeModule) {
      throw new Error('Runtime модуля не активен.');
    }

    return activeModule;
  }

  getActiveModuleOrNull(): ActiveModuleRuntime | null {
    switch (this.state.phase) {
      case 'active':
        return this.state.active;
      case 'loading':
      case 'pending':
        return this.state.active;
      case 'empty':
        return null;
    }
  }

  getErrorBoundaryModuleOrNull(): ActiveModuleRuntime | null {
    if (this.state.phase === 'pending') {
      return this.state.pending;
    }

    return this.getActiveModuleOrNull();
  }

  getViewModuleOrNull(): ActiveModuleRuntime | null {
    const activeModule = this.getActiveModuleOrNull();

    if (activeModule) {
      return activeModule;
    }

    if (this.state.phase === 'pending') {
      return this.state.pending;
    }

    return null;
  }

  getLoaderData<TValue>(controllerToken: DependencyToken<unknown>): TValue {
    const moduleRuntime = this.getViewModuleOrNull();

    if (!moduleRuntime) {
      throw new Error('Данные загрузчика модуля недоступны.');
    }

    return getControllerLoaderData<TValue>(moduleRuntime.loaderData, controllerToken);
  }

  async load(args: ControllerLoaderArgs, reporter?: ModuleRuntimeReporterInput): Promise<unknown> {
    const moduleRuntime = await this.activate(args.request.signal, reporter);

    try {
      return await this.loadModuleRuntime(moduleRuntime, args, reporter);
    } catch (error) {
      if (args.request.signal.aborted && this.state.phase === 'pending' && this.state.pending === moduleRuntime) {
        this.disposePending(reporter);
      }

      throw error;
    }
  }

  async revalidate(options: ModuleRuntimeRevalidateOptions = {}): Promise<void> {
    const moduleRuntime = this.getActiveModule();
    const abortController = new AbortController();
    const externalSignal = options.signal;
    const abortRevalidate = (): void => {
      abortController.abort();
    };

    if (externalSignal?.aborted) {
      abortController.abort();
    } else {
      externalSignal?.addEventListener('abort', abortRevalidate, { once: true });
    }

    const args: ControllerLoaderArgs = {
      params: moduleRuntime.loaderParams,
      request: new Request(moduleRuntime.loaderRequestUrl, {
        signal: abortController.signal,
      }),
    };

    try {
      const loaderData = await this.loadModuleRuntime(moduleRuntime, args, undefined, options.controllerToken);

      moduleRuntime.loaderData =
        options.controllerToken === undefined
          ? loaderData
          : mergeControllerLoaderData(moduleRuntime.loaderData, loaderData);
      this.emit();
    } finally {
      externalSignal?.removeEventListener('abort', abortRevalidate);
    }
  }

  subscribe(listener: ModuleRuntimeListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  commit(reporter?: ModuleRuntimeReporterInput): void {
    if (this.state.phase !== 'pending') {
      return;
    }

    const activeModule = this.state.active;
    const pendingModule = this.state.pending;

    this.state = {
      active: pendingModule,
      phase: 'active',
    };

    if (activeModule && activeModule !== pendingModule) {
      this.scheduleModuleDispose(activeModule, reporter);
    }
  }

  discardPending(reporter?: ModuleRuntimeReporterInput): void {
    this.disposePending(reporter);
  }

  private async loadModuleRuntime(
    moduleRuntime: ActiveModuleRuntime,
    args: ControllerLoaderArgs,
    reporter?: ModuleRuntimeReporterInput,
    controllerToken?: DependencyToken<unknown>,
  ): Promise<ControllerLoaderData> {
    await this.runProviderBeforeLoad(moduleRuntime, args, reporter);
    this.throwIfAborted(args.request.signal);

    const loaderData = await this.loadControllers(moduleRuntime, args, controllerToken);

    this.throwIfAborted(args.request.signal);
    await this.runProviderSetup(moduleRuntime, args, reporter);
    this.throwIfAborted(args.request.signal);
    await this.runProviderBeforeRender(moduleRuntime, args, reporter);
    this.throwIfAborted(args.request.signal);

    if (controllerToken === undefined) {
      moduleRuntime.loaderData = loaderData;
      moduleRuntime.loaderParams = args.params;
      moduleRuntime.loaderRequestUrl = args.request.url;
      this.emit();
    }

    return loaderData;
  }

  async actionActive(controllerKey: string, args: ControllerActionArgs): Promise<unknown> {
    const activeModule = this.getActiveModule();
    const controllerToken = activeModule.actionControllers.get(controllerKey);

    if (!controllerToken) {
      throw new Error('Действие контроллера не зарегистрировано в активном модуле.');
    }

    const controller = activeModule.controllers.get(controllerToken);

    if (!controller?.action) {
      throw new Error('Действие контроллера недоступно.');
    }

    return await executeGuardedMethod({
      context: args,
      execute: () => {
        return controller.action?.(args);
      },
      method: 'action',
      scope: activeModule.scope,
      target: controller,
      token: controllerToken,
    });
  }

  async dispose(): Promise<void> {
    return this.disposeWithReporter();
  }

  async disposeWithReporter(reporter?: ModuleRuntimeReporterInput): Promise<void> {
    const activeModule = this.getActiveModuleOrNull();
    const pendingModule = this.state.phase === 'pending' ? this.state.pending : null;

    this.state = { phase: 'empty' };

    if (pendingModule) {
      this.scheduleModuleDispose(pendingModule, reporter);
    }

    if (activeModule && activeModule !== pendingModule) {
      this.scheduleModuleDispose(activeModule, reporter);
    }

    await this.waitForCleanup();
  }

  private disposePending(reporter?: ModuleRuntimeReporterInput): void {
    if (this.state.phase !== 'pending') {
      return;
    }

    const activeModule = this.state.active;
    const pendingModule = this.state.pending;

    this.state = activeModule ? { active: activeModule, phase: 'active' } : { phase: 'empty' };

    this.scheduleModuleDispose(pendingModule, reporter);
  }

  private isSessionActive(sessionId: number): boolean {
    return (this.state.phase === 'loading' || this.state.phase === 'pending') && this.state.sessionId === sessionId;
  }

  private async disposeModule(
    moduleRuntime: ActiveModuleRuntime,
    reporter?: ModuleRuntimeReporterInput,
  ): Promise<void> {
    const controllerResults = await Promise.allSettled(
      [...moduleRuntime.controllers.values()].map((controller) => {
        return Promise.resolve().then(() => controller.dispose?.());
      }),
    );

    controllerResults.forEach((result) => {
      if (result.status === 'rejected') {
        reportCleanupError(reporter, result.reason);
      }
    });

    const providerResults = await moduleRuntime.providerPipeline.dispose();

    providerResults.forEach((result) => {
      if (result.status === 'rejected') {
        reportProviderDisposeError(reporter, result.reason);
      }
    });

    try {
      moduleRuntime.scope.dispose();
    } catch (error) {
      reportCleanupError(reporter, error);
    }
  }

  private scheduleModuleDispose(moduleRuntime: ActiveModuleRuntime, reporter?: ModuleRuntimeReporterInput): void {
    if (this.disposedModules.has(moduleRuntime)) {
      return;
    }

    this.disposedModules.add(moduleRuntime);

    const task: ModuleCleanupTask = {
      moduleRuntime,
      promise: this.disposeModule(moduleRuntime, reporter),
    };

    this.cleanupTasks.add(task);
    void task.promise.finally(() => {
      this.cleanupTasks.delete(task);
    });
  }

  private async waitForCleanup(): Promise<void> {
    while (this.cleanupTasks.size > 0) {
      await Promise.all(
        [...this.cleanupTasks].map((task) => {
          return task.promise;
        }),
      );
    }
  }

  private async activateModule(signal: AbortSignal): Promise<ActiveModuleRuntime> {
    const moduleExports = await this.loadModule();

    if (signal.aborted) {
      throw new Error('Активация модуля была прервана.');
    }

    const moduleConstructor = resolveModuleExport(moduleExports);
    const moduleScope = new ModuleScope(this.ownerScope, (registry) => {
      registry.bind(RevalidateServiceInterface).toConstantValue(
        new RuntimeRevalidateService((controllerToken, options) =>
          this.revalidate({
            controllerToken,
            signal: options?.signal,
          }),
        ),
      );
    });

    try {
      moduleScope.activate(moduleConstructor, { collectControllerBindings: true });

      const metadata = getModuleMetadata(moduleConstructor);
      const providerPipeline = new RuntimeProviderPipeline(moduleScope, metadata.providers ?? []);
      const controllers = this.resolveControllers(moduleScope);
      const actionControllers = this.createActionControllers(controllers);

      return {
        actionControllers,
        controllers,
        loaderData: createControllerLoaderData([]),
        loaderParams: {},
        loaderRequestUrl: 'http://localhost/module-runtime',
        metadata,
        module: moduleConstructor,
        providerPipeline,
        scope: moduleScope,
      };
    } catch (error) {
      moduleScope.dispose();
      throw error;
    }
  }

  private resolveControllers(moduleScope: ModuleScope): Map<DependencyToken<unknown>, ControllerInterface> {
    const controllers = new Map<DependencyToken<unknown>, ControllerInterface>();

    for (const controllerToken of moduleScope.getControllerTokens()) {
      controllers.set(controllerToken, moduleScope.get(controllerToken) as ControllerInterface);
    }

    return controllers;
  }

  private createActionControllers(
    controllers: ReadonlyMap<DependencyToken<unknown>, ControllerInterface>,
  ): Map<string, DependencyToken<unknown>> {
    const actionControllers = new Map<string, DependencyToken<unknown>>();

    for (const controllerToken of controllers.keys()) {
      const actionKey = createControllerActionKey(controllerToken);

      if (actionControllers.has(actionKey)) {
        throw new Error(`Ключ действия контроллера дублируется: ${actionKey}.`);
      }

      actionControllers.set(actionKey, controllerToken);
    }

    return actionControllers;
  }

  private emit(): void {
    this.listeners.forEach((listener) => {
      listener();
    });
  }

  private async loadControllers(
    moduleRuntime: ActiveModuleRuntime,
    args: ControllerLoaderArgs,
    controllerToken?: DependencyToken<unknown>,
  ): Promise<ControllerLoaderData> {
    const controllers = getControllerEntries(
      moduleRuntime.controllers,
      controllerToken,
      'Контроллер модуля недоступен.',
    );
    const entries = await Promise.all(
      controllers.map(async ([controllerToken, controller]) => {
        const value = controller?.loader
          ? await executeGuardedMethod({
              context: args,
              execute: () => {
                return controller.loader?.(args);
              },
              method: 'loader',
              scope: moduleRuntime.scope,
              target: controller,
              token: controllerToken,
            })
          : void 0;

        return {
          actionKey: createControllerActionKey(controllerToken),
          controller: controllerToken,
          value,
        };
      }),
    );

    return createControllerLoaderData(entries);
  }

  private async runProviderBeforeLoad(
    moduleRuntime: ActiveModuleRuntime,
    args: ControllerLoaderArgs,
    reporter?: ModuleRuntimeReporterInput,
  ): Promise<void> {
    const context = createProviderContext(moduleRuntime.scope, args);

    try {
      await moduleRuntime.providerPipeline.runBeforeLoad(context);
    } catch (error) {
      reportProviderBeforeLoadError(reporter, error);
      throw error;
    }
  }

  private async runProviderBeforeRender(
    moduleRuntime: ActiveModuleRuntime,
    args: ControllerLoaderArgs,
    reporter?: ModuleRuntimeReporterInput,
  ): Promise<void> {
    const context = createProviderContext(moduleRuntime.scope, args);

    try {
      await moduleRuntime.providerPipeline.runBeforeRender(context);
    } catch (error) {
      reportProviderBeforeRenderError(reporter, error);
      throw error;
    }
  }

  private async runProviderSetup(
    moduleRuntime: ActiveModuleRuntime,
    args: ControllerLoaderArgs,
    reporter?: ModuleRuntimeReporterInput,
  ): Promise<void> {
    const context = createProviderContext(moduleRuntime.scope, args);

    try {
      await moduleRuntime.providerPipeline.setup(context);
    } catch (error) {
      reportProviderSetupError(reporter, error);
      throw error;
    }
  }

  private throwIfAborted(signal: AbortSignal): void {
    if (signal.aborted) {
      throw new Error('Активация модуля была прервана.');
    }
  }
}

const createProviderContext = (scope: ModuleScope, args: ControllerLoaderArgs): RuntimeProviderPipelineContext => {
  return {
    params: args.params,
    props: {},
    request: args.request,
    scope,
    signal: args.request.signal,
  };
};

const getControllerEntries = <TController>(
  controllers: ReadonlyMap<DependencyToken<unknown>, TController>,
  controllerToken: DependencyToken<unknown> | undefined,
  errorMessage: string,
): Array<[DependencyToken<unknown>, TController]> => {
  if (controllerToken === undefined) {
    return [...controllers];
  }

  const controller = controllers.get(controllerToken);

  if (controller === undefined) {
    throw new Error(errorMessage);
  }

  return [[controllerToken, controller]];
};

const reportCleanupError = (reporter: ModuleRuntimeReporterInput | undefined, error: unknown): void => {
  if (typeof reporter === 'function') {
    reporter(error);
    return;
  }

  reporter?.cleanup?.(error);
};

const reportProviderBeforeLoadError = (reporter: ModuleRuntimeReporterInput | undefined, error: unknown): void => {
  if (typeof reporter === 'function') {
    reporter(error);
    return;
  }

  reporter?.providerBeforeLoad?.(error);
};

const reportProviderBeforeRenderError = (reporter: ModuleRuntimeReporterInput | undefined, error: unknown): void => {
  if (typeof reporter === 'function') {
    reporter(error);
    return;
  }

  reporter?.providerBeforeRender?.(error);
};

const reportProviderDisposeError = (reporter: ModuleRuntimeReporterInput | undefined, error: unknown): void => {
  if (typeof reporter === 'function') {
    reporter(error);
    return;
  }

  reporter?.providerDispose?.(error);
};

const reportProviderSetupError = (reporter: ModuleRuntimeReporterInput | undefined, error: unknown): void => {
  if (typeof reporter === 'function') {
    reporter(error);
    return;
  }

  reporter?.providerSetup?.(error);
};
