import type {
  RouterBridgeCommitContextInterface,
  RouterBridgeHistoryEntryInterface,
  RouterBridgeInitializeContextInterface,
  RouterBridgeInterface,
  RouterBridgeLocationInterface,
} from '../../../../core/router/bridge/router-bridge';
import { getRouteDefinition } from '../../../../core/router/declaration/route';
import type { NavigationRouterState, NavigationState } from '../../../../core/router/runtime/navigation-state';

export interface NativeNavigationDriver {
  commit(navigation: NavigationState, history: RouterBridgeHistoryEntryInterface): void | Promise<void>;

  rootBack(): void | Promise<void>;
}

export interface NativeRouterBridgeOptions {
  readonly onCommit?: (navigation: NavigationState) => void;
}

interface NativeCommittedNavigation {
  readonly history: RouterBridgeHistoryEntryInterface;
  readonly navigation: NavigationState;
}

export class NativeRouterBridge implements RouterBridgeInterface {
  readonly runtimeRetention = 'retain' as const;

  private committed: NativeCommittedNavigation | null = null;
  private context: RouterBridgeInitializeContextInterface | null = null;
  private driver: NativeNavigationDriver | null = null;

  constructor(private readonly options: NativeRouterBridgeOptions) {}

  async initialize(context: RouterBridgeInitializeContextInterface): Promise<void> {
    this.context = context;
    await context.navigate.root();
  }

  async commit(navigation: NavigationState, context: RouterBridgeCommitContextInterface): Promise<void> {
    this.committed = Object.freeze({ history: context.history, navigation });
    await this.driver?.commit(navigation, context.history);
    this.options.onCommit?.(navigation);
  }

  async back(): Promise<void> {
    const handled = await this.requireContext().back();

    if (!handled) await this.driver?.rootBack();
  }

  cancelPendingNavigation(): boolean {
    return this.context?.cancelNavigation() ?? false;
  }

  registerDriver(driver: NativeNavigationDriver): () => void {
    if (this.driver && this.driver !== driver) {
      throw new Error('Native router bridge уже подключён к navigation host.');
    }

    this.driver = driver;

    if (this.committed) {
      void driver.commit(this.committed.navigation, this.committed.history);
    }

    return () => {
      if (this.driver === driver) this.driver = null;
    };
  }

  toLocation(navigation: NavigationState): RouterBridgeLocationInterface {
    return createBridgeLocation(navigation);
  }

  dispose(): void {
    this.committed = null;
    this.context = null;
    this.driver = null;
  }

  private requireContext(): RouterBridgeInitializeContextInterface {
    if (!this.context) {
      throw new Error('Native router bridge ещё не инициализирован.');
    }

    return this.context;
  }
}

export const createNativeRouterBridge = (options: NativeRouterBridgeOptions = {}): NativeRouterBridge => {
  return new NativeRouterBridge(options);
};

const createBridgeLocation = (navigation: NavigationState): RouterBridgeLocationInterface => {
  const nestedAddress: string[] = [];
  let child = navigation.root.child;

  while (child) {
    nestedAddress.push(...encodeRouterState(child));
    child = child.child;
  }

  const deepest = getDeepestRouterState(navigation.root.child);

  return Object.freeze({
    address: Object.freeze(encodeRouterState(navigation.root)),
    nested:
      nestedAddress.length > 0
        ? Object.freeze({ address: Object.freeze(nestedAddress), query: deepest?.query ?? EMPTY_QUERY })
        : null,
    query: navigation.root.query,
    revalidate: navigation.revalidation !== null,
    state: navigation.state,
  });
};

const encodeRouterState = (state: NavigationRouterState): string[] => {
  return state.path.flatMap((entry) => {
    const segments = getRouteDefinition(entry.route).address?.segments ?? [];

    return segments.map((segment) => {
      const value = typeof segment === 'string' ? segment : entry.params[segment.name];

      if (value === null || value === undefined) {
        throw new Error('Navigation Route param нельзя сериализовать в native navigation state.');
      }

      return String(value);
    });
  });
};

const getDeepestRouterState = (state: NavigationRouterState | null): NavigationRouterState | null => {
  let current = state;

  while (current?.child) current = current.child;

  return current;
};

const EMPTY_QUERY = Object.freeze({});
