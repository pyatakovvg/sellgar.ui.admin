import type { NavigationState } from '../navigation-state';
import type { RouteRuntime } from '../route-runtime';

export interface RouterRuntimePreparedTransition<TPresentation = unknown> {
  readonly navigation: NavigationState;

  commit(): Promise<void>;

  complete(context: RouterRuntimeTransitionCompletionContext): Promise<void>;

  discard(): Promise<void>;

  getRouteRuntimes(): readonly RouteRuntime<TPresentation>[];
}

export interface RouterRuntimeTransitionCompletionContext {
  readonly signal: AbortSignal;
}

interface PreparedRouterTransitionOptions<TPresentation> {
  readonly commit: () => Promise<void>;
  readonly complete: (context: RouterRuntimeTransitionCompletionContext) => Promise<void>;
  readonly discard: () => Promise<void>;
  readonly getRouteRuntimes: () => readonly RouteRuntime<TPresentation>[];
  readonly navigation: NavigationState;
}

export class PreparedRouterTransition<TPresentation> implements RouterRuntimePreparedTransition<TPresentation> {
  readonly navigation: NavigationState;
  private settlement: Promise<void> | null = null;
  private completion: Promise<void> | null = null;
  private state: 'pending' | 'committed' | 'discarded' = 'pending';

  constructor(private readonly options: PreparedRouterTransitionOptions<TPresentation>) {
    this.navigation = options.navigation;
  }

  commit(): Promise<void> {
    if (this.state === 'committed') {
      return this.settlement ?? Promise.resolve();
    }

    if (this.state === 'discarded') {
      return Promise.reject(new Error('Подготовленный router transition уже отменён.'));
    }

    this.state = 'committed';
    this.settlement = this.options.commit();

    return this.settlement;
  }

  complete(context: RouterRuntimeTransitionCompletionContext): Promise<void> {
    if (this.state !== 'committed') {
      return Promise.reject(new Error('Завершить можно только зафиксированный router transition.'));
    }

    this.completion ??= (this.settlement ?? Promise.resolve()).then(() => this.options.complete(context));

    return this.completion;
  }

  discard(): Promise<void> {
    if (this.state === 'discarded') {
      return this.settlement ?? Promise.resolve();
    }

    if (this.state === 'committed') {
      return Promise.reject(new Error('Подготовленный router transition уже зафиксирован.'));
    }

    this.state = 'discarded';
    this.settlement = this.options.discard();

    return this.settlement;
  }

  getRouteRuntimes(): readonly RouteRuntime<TPresentation>[] {
    return this.options.getRouteRuntimes();
  }
}
