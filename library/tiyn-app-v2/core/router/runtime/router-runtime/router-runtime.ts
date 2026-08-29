import type { ApplicationControllerInterface } from '../../../application/lifecycle/application-lifecycle';
import type { SessionRuntimeStateInterface } from '../../../application/session/session-runtime-state';
import type { NavigationBlockerBoundary } from '../../../features/navigation-blocker/runtime/navigation-blocker-runtime';
import type { ModuleExportResolverInterface } from '../../../module/resolution/module-export-resolver';
import type { PolicyBoundaryDecision } from '../../../policy/contract/policy-boundary-decision';
import { PolicyRunner } from '../../../policy/runtime/policy-runner';
import {
  reportRuntimeFailure,
  RuntimeFailureReporterInterface,
  type RuntimeOwner,
} from '../../../runtime/failure/runtime-failure';
import { captureRuntimeFailure } from '../../../runtime/failure/runtime-failure-signal';
import { RuntimeOperationCoordinator } from '../../../runtime/operation/runtime-operation-coordinator';
import { ProviderPipeline } from '../../../runtime/provider/provider-pipeline';
import type { RuntimeScope } from '../../../runtime/scope/base/runtime-scope';
import { RouterScope } from '../../../runtime/scope/kind/router-scope';
import type { RouteDeclaration } from '../../declaration/route';
import { getRouterDefinition, type RouterDeclaration } from '../../declaration/router';
import { createScopedNavigate, NavigateServiceInterface } from '../../service/navigate-service';
import {
  ApplicationRouteQueryService,
  RouteQueryServiceInterface,
  ScopedRouteQueryService,
} from '../../service/route-query-service';
import {
  areNavigationParamsEqual,
  areNavigationQueriesEqual,
  type NavigationRouterState,
  type NavigationState,
} from '../navigation-state';
import { getRouterGraph } from '../router-graph';
import { RouteRuntime, type RouteRuntimeActionExecution, type RouteRuntimeBoundaryPhase } from '../route-runtime';
import type { RouteRuntimeContextInterface } from '../route-runtime-context';
import {
  resolveNavigationCandidates,
  type ResolvedNavigationCandidate,
  type ResolvedRouteEntry,
  type ResolvedRouterTarget,
} from './router-navigation.resolver.ts';
import { PreparedRouterTransition, type RouterRuntimePreparedTransition } from './router-transition.ts';

export type RouterRuntimePhase =
  'active' | 'disposed' | 'disposing' | 'failed' | 'forbidden' | 'idle' | 'not-found' | 'pending' | 'preparing';

type RouterRuntimeBoundaryPhase = Extract<RouterRuntimePhase, 'failed' | 'forbidden' | 'not-found'>;

export interface RouterRuntimeSnapshot {
  readonly error: unknown | null;
  readonly phase: RouterRuntimePhase;
}

export interface RouterRuntimePrepareContext {
  readonly app: ApplicationControllerInterface;
  readonly blockersConfirmed?: boolean;
  readonly session: SessionRuntimeStateInterface;
  readonly signal: AbortSignal;
}

type ActionPolicyRedirectDecision = Extract<
  PolicyBoundaryDecision,
  { readonly type: 'redirect' | 'redirect-to-saved-location' }
>;

export interface RouterRuntimeExecutionContext {
  readonly app: ApplicationControllerInterface;
  readonly applyActionRedirect: (decision: ActionPolicyRedirectDecision) => Promise<void>;
  readonly confirmNavigation?: (
    leavingBoundaries: readonly NavigationBlockerBoundary[],
    signal: AbortSignal,
  ) => Promise<boolean>;
  readonly session: SessionRuntimeStateInterface;
}

export type RouterRuntimePrepareResult<TPresentation = unknown> =
  | {
      readonly decision: PolicyBoundaryDecision;
      readonly navigation: NavigationState;
      readonly type: 'decision';
    }
  | {
      readonly reason: unknown;
      readonly type: 'interrupted';
    }
  | {
      readonly transition: RouterRuntimePreparedTransition<TPresentation>;
      readonly type: 'ready';
    };

export type RouterRuntimeRefreshResult =
  | {
      readonly decision: Extract<
        PolicyBoundaryDecision,
        { readonly type: 'error' | 'redirect' | 'redirect-to-saved-location' }
      >;
      readonly type: 'decision';
    }
  | { readonly type: 'refreshed' }
  | { readonly type: 'retry-navigation' };

type RouterRuntimeListener = () => void;

interface RouterRuntimeEnvironment<TPresentation> {
  readonly execution: RouterRuntimeExecutionContext;
  readonly exportResolver: ModuleExportResolverInterface<TPresentation>;
  readonly rootRouter: RouterDeclaration;
  readonly routeIndexes: ReadonlyMap<RouteDeclaration, number>;
  readonly routerIndexes: ReadonlyMap<RouterDeclaration, number>;
  rootRuntime: RouterRuntime<TPresentation> | null;
}

interface RuntimeRouteEntry<TPresentation> {
  readonly resolved: ResolvedRouteEntry;
  readonly runtime: RouteRuntime<TPresentation>;
}

export interface ActiveChildRouterRuntime<TPresentation> {
  readonly owner: RouteRuntime<TPresentation>;
  readonly runtime: RouterRuntime<TPresentation>;
}

export interface RouterRuntimeBranchSnapshot<TPresentation> {
  readonly child: ActiveChildRouterRuntime<TPresentation> | null;
  readonly childPending: boolean;
  readonly pending: boolean;
  readonly pendingRoute: RouteRuntime<TPresentation> | null;
  readonly routes: readonly RouteRuntime<TPresentation>[];
}

interface RouterRuntimeBranch<TPresentation> {
  readonly child: ActiveChildRouterRuntime<TPresentation> | null;
  readonly routes: readonly RuntimeRouteEntry<TPresentation>[];
}

interface RouterTransitionPlan<TPresentation> {
  readonly childPlan: RouterTransitionPlan<TPresentation> | null;
  readonly commonRouteCount: number;
  readonly createdChild: boolean;
  readonly createdRoutes: readonly RuntimeRouteEntry<TPresentation>[];
  readonly localChanged: boolean;
  readonly nextChild: RouterRuntime<TPresentation> | null;
  readonly nextChildOwner: RouteRuntime<TPresentation> | null;
  readonly nextRoutes: readonly RuntimeRouteEntry<TPresentation>[];
  readonly previousBranch: RouterRuntimeBranch<TPresentation> | null;
  readonly query: Readonly<Record<string, unknown>>;
  readonly runtime: RouterRuntime<TPresentation>;
}

interface RouterBoundaryTransition<TPresentation> {
  readonly error: unknown | null;
  readonly kind: 'router';
  readonly phase: RouterRuntimeBoundaryPhase;
  readonly plan: RouterTransitionPlan<TPresentation>;
}

interface RouteBoundaryTransition<TPresentation> {
  readonly entry: RuntimeRouteEntry<TPresentation>;
  readonly error: unknown | null;
  readonly kind: 'route';
  readonly origin: 'policy' | 'runtime';
  readonly phase: RouteRuntimeBoundaryPhase;
  readonly plan: RouterTransitionPlan<TPresentation>;
}

type RuntimeBoundaryTransition<TPresentation> =
  RouteBoundaryTransition<TPresentation> | RouterBoundaryTransition<TPresentation>;

interface RouterPlanPreparation<TPresentation> {
  readonly plan: RouterTransitionPlan<TPresentation>;
  readonly routes: readonly RuntimeRouteEntry<TPresentation>[];
}

interface RouterPlanPolicyResult<TPresentation> {
  readonly decision: PolicyBoundaryDecision;
  readonly owner:
    { readonly kind: 'route'; readonly entry: RuntimeRouteEntry<TPresentation> } | { readonly kind: 'router' };
  readonly plan: RouterTransitionPlan<TPresentation>;
}

type ActivePolicyBoundary<TPresentation> =
  | {
      readonly kind: 'route';
      readonly entry: RuntimeRouteEntry<TPresentation>;
    }
  | {
      readonly kind: 'router';
      readonly runtime: RouterRuntime<TPresentation>;
    };

interface PendingRouterTransition<TPresentation> {
  readonly abortController: AbortController;
  readonly boundary: RuntimeBoundaryTransition<TPresentation> | null;
  readonly disposeLinkedSignal: () => void;
  readonly navigation: NavigationState;
  readonly plan: RouterTransitionPlan<TPresentation>;
  readonly transition: PreparedRouterTransition<TPresentation>;
}

export class RouterRuntime<TPresentation = unknown> {
  private readonly definition;
  private readonly environment: RouterRuntimeEnvironment<TPresentation>;
  private readonly lifecycleAbortController = new AbortController();
  private readonly listeners = new Set<RouterRuntimeListener>();
  private readonly owner: RuntimeOwner;
  private readonly policyRunner: PolicyRunner<RouteRuntimeContextInterface>;
  private readonly preparationTasks = new Set<Promise<RouterRuntimePrepareResult<TPresentation>>>();
  private readonly routerScope: RouterScope;
  private readonly queryService: ScopedRouteQueryService | null;

  private committedBoundary: Pick<RouterRuntimeSnapshot, 'error' | 'phase'> | null = null;
  private committedBranch: RouterRuntimeBranch<TPresentation> | null = null;
  private committedNavigation: NavigationState | undefined;
  private disposePromise: Promise<void> | null = null;
  private pendingBranchPlan: RouterTransitionPlan<TPresentation> | null = null;
  private pendingTransition: PendingRouterTransition<TPresentation> | null = null;
  private prepareAbortController: AbortController | null = null;
  private prepareRevision = 0;
  private providerPipeline: ProviderPipeline | null = null;
  private refreshAbortController: AbortController | null = null;
  private refreshBoundary: Pick<RouterRuntimeSnapshot, 'error' | 'phase'> | null = null;
  private refreshPromise: Promise<RouterRuntimeRefreshResult> | null = null;
  private snapshot: RouterRuntimeSnapshot = { error: null, phase: 'idle' };

  constructor(
    readonly router: RouterDeclaration,
    ownerScope: RuntimeScope,
    exportResolver: ModuleExportResolverInterface<TPresentation>,
    execution: RouterRuntimeExecutionContext,
    runtimeId = 'router:0',
    environment?: RouterRuntimeEnvironment<TPresentation>,
  ) {
    assertRuntimeId(runtimeId);

    this.definition = getRouterDefinition(router);
    this.environment = environment ?? createEnvironment(router, exportResolver, execution);

    if (this.environment.rootRuntime === null) {
      this.environment.rootRuntime = this;
    }
    this.owner = { id: runtimeId, kind: 'router' };
    const navigate = ownerScope.has(NavigateServiceInterface)
      ? createScopedNavigate(ownerScope.get(NavigateServiceInterface), router)
      : null;
    this.queryService = ownerScope.has(ApplicationRouteQueryService)
      ? new ScopedRouteQueryService(ownerScope.get(ApplicationRouteQueryService), router, navigate)
      : null;
    this.routerScope = new RouterScope(ownerScope, (registry) => {
      if (this.queryService) {
        registry.bind(RouteQueryServiceInterface).toConstantValue(this.queryService);
      }
      if (!navigate) {
        return;
      }

      registry.bind(NavigateServiceInterface).toConstantValue(navigate);
    });

    try {
      for (const bindingOwner of this.definition.bindingOwners) {
        this.routerScope.activate(bindingOwner);
      }

      this.policyRunner = new PolicyRunner(this.routerScope, this.owner);
    } catch (error) {
      this.routerScope.dispose();
      throw error;
    }
  }

  getSnapshot(): RouterRuntimeSnapshot {
    return this.refreshBoundary ?? this.snapshot;
  }

  getRouterScope(): RuntimeScope {
    return this.routerScope;
  }

  getCommittedNavigation(): NavigationState | undefined {
    return this.committedNavigation;
  }

  getActiveRouteRuntimes(): readonly RouteRuntime<TPresentation>[] {
    return Object.freeze(collectBranchRouteRuntimes(this.committedBranch));
  }

  getActiveLocalRouteRuntimes(): readonly RouteRuntime<TPresentation>[] {
    return Object.freeze(this.committedBranch?.routes.map((entry) => entry.runtime) ?? []);
  }

  getActiveChildRouterRuntimeOrNull(): ActiveChildRouterRuntime<TPresentation> | null {
    return this.committedBranch?.child ?? null;
  }

  getBranchSnapshot(): RouterRuntimeBranchSnapshot<TPresentation> {
    const pendingPlan = this.pendingBranchPlan;
    const committedBranch = this.committedBranch;
    const routes = Object.freeze(committedBranch?.routes.map((entry) => entry.runtime) ?? []);

    if (!pendingPlan) {
      return Object.freeze({
        child: committedBranch?.child ?? null,
        childPending: false,
        pending: false,
        pendingRoute: null,
        routes,
      });
    }

    if (pendingPlan.localChanged) {
      const boundaryIndex = Math.min(pendingPlan.commonRouteCount, routes.length - 1);

      return Object.freeze({
        child: null,
        childPending: false,
        pending: true,
        pendingRoute: boundaryIndex >= 0 ? routes[boundaryIndex]! : null,
        routes,
      });
    }

    const committedChild = committedBranch?.child ?? null;
    const pendingChild =
      pendingPlan.nextChild && pendingPlan.nextChildOwner
        ? Object.freeze({ owner: pendingPlan.nextChildOwner, runtime: pendingPlan.nextChild })
        : null;

    return Object.freeze({
      child: committedChild ?? pendingChild,
      childPending:
        pendingChild !== null && (committedChild === null || committedChild.runtime !== pendingChild.runtime),
      pending: true,
      pendingRoute: null,
      routes,
    });
  }

  getPendingRouteRuntimes(): readonly RouteRuntime<TPresentation>[] {
    return Object.freeze(this.pendingBranchPlan ? collectPlanRouteRuntimes(this.pendingBranchPlan) : []);
  }

  async failRender(error: unknown): Promise<void> {
    if (this.snapshot.phase === 'disposed' || this.snapshot.phase === 'disposing') {
      return;
    }

    this.prepareRevision += 1;
    this.prepareAbortController?.abort(error);
    await this.pendingTransition?.transition.discard().catch(() => undefined);

    const branch = this.committedBranch;

    this.committedBranch = null;
    this.committedBoundary = { error, phase: 'failed' };
    this.setSnapshot(this.committedBoundary);
    await this.disposeBranch(branch);
    await this.reportRenderFailure(error);
  }

  private async trimCommittedRouteBranch(runtime: RouteRuntime<TPresentation>, reason: unknown): Promise<void> {
    if (this.snapshot.phase === 'disposed' || this.snapshot.phase === 'disposing') {
      return;
    }

    const branch = this.committedBranch;
    const boundaryIndex = branch?.routes.findIndex((entry) => entry.runtime === runtime) ?? -1;

    if (!branch || boundaryIndex < 0) {
      return;
    }

    this.prepareRevision += 1;
    this.prepareAbortController?.abort(reason);
    await this.pendingTransition?.transition.discard().catch(() => undefined);

    const childOwnerIndex = branch.child
      ? branch.routes.findIndex((entry) => entry.runtime === branch.child!.owner)
      : -1;
    const child = childOwnerIndex >= 0 && childOwnerIndex < boundaryIndex ? branch.child : null;
    const discardedChild = child === null ? branch.child : null;
    const discardedRoutes = branch.routes.slice(boundaryIndex + 1).reverse();

    this.committedBranch = {
      child,
      routes: Object.freeze(branch.routes.slice(0, boundaryIndex + 1)),
    };
    this.emit();

    await discardedChild?.runtime.dispose();

    for (const entry of discardedRoutes) {
      await this.disposeRouteRuntime(entry.runtime, 'route.render-failure.dispose');
    }
  }

  private executeRouteAction(execution: RouteRuntimeActionExecution<TPresentation>): Promise<unknown> {
    const rootRuntime = this.environment.rootRuntime;

    if (rootRuntime === null) {
      return Promise.reject(new Error('Root RouterRuntime недоступен для controller action.'));
    }

    if (rootRuntime !== this) {
      return rootRuntime.executeRouteAction(execution);
    }

    return this.routerScope.get(RuntimeOperationCoordinator).run(() => this.runRouteAction(execution));
  }

  private async runRouteAction(execution: RouteRuntimeActionExecution<TPresentation>): Promise<unknown> {
    if (execution.signal.aborted) {
      return undefined;
    }

    const boundaries: ActivePolicyBoundary<TPresentation>[] = [];

    if (!this.collectActionPolicyPath(execution.runtime, boundaries)) {
      throw new Error('Controller action принадлежит неактивному RouteRuntime.');
    }

    const context: RouterRuntimePrepareContext = {
      app: this.environment.execution.app,
      session: this.environment.execution.session,
      signal: execution.signal,
    };

    for (const boundary of boundaries) {
      const decision =
        boundary.kind === 'router'
          ? await boundary.runtime.policyRunner.execute(
              boundary.runtime.definition.canMatch,
              createPolicyContext(EMPTY_PARAMS, context, execution.signal),
            )
          : await boundary.entry.runtime.executePolicyBoundary(
              'canMatch',
              createPolicyContext(boundary.entry.runtime.getParams(), context, execution.signal),
            );

      if (decision.type !== 'continue') {
        await this.applyActionPolicyDecision(boundary, decision);
        return undefined;
      }
    }

    for (const boundary of boundaries) {
      if (boundary.kind === 'router') {
        continue;
      }

      const decision = await boundary.entry.runtime.executePolicyBoundary(
        'canAction',
        createPolicyContext(boundary.entry.runtime.getParams(), context, execution.signal),
      );

      if (decision.type !== 'continue') {
        await this.applyActionPolicyDecision(boundary, decision);
        return undefined;
      }
    }

    if (execution.signal.aborted) {
      return undefined;
    }

    return await execution.execute();
  }

  private collectActionPolicyPath(
    target: RouteRuntime<TPresentation>,
    boundaries: ActivePolicyBoundary<TPresentation>[],
  ): boolean {
    const initialLength = boundaries.length;
    const branch = this.committedBranch;

    boundaries.push({ kind: 'router', runtime: this });

    for (const entry of branch?.routes ?? []) {
      boundaries.push({ entry, kind: 'route' });

      if (entry.runtime === target) {
        return true;
      }

      if (branch?.child?.owner === entry.runtime) {
        if (branch.child.runtime.collectActionPolicyPath(target, boundaries)) {
          return true;
        }
      }
    }

    boundaries.splice(initialLength);

    return false;
  }

  private async applyActionPolicyDecision(
    boundary: ActivePolicyBoundary<TPresentation>,
    decision: Exclude<PolicyBoundaryDecision, { readonly type: 'continue' }>,
  ): Promise<void> {
    if (decision.type === 'redirect' || decision.type === 'redirect-to-saved-location') {
      await this.environment.execution.applyActionRedirect(decision);
      return;
    }

    if (decision.type === 'error') {
      if (boundary.kind === 'router') {
        await boundary.runtime.reportActionFailure(decision.error);
      } else {
        await boundary.entry.runtime.reportActionFailure(decision.error);
      }

      throw decision.error;
    }

    throw new ActionPolicyDecisionError(decision);
  }

  refresh(context: RouterRuntimePrepareContext): Promise<RouterRuntimeRefreshResult> {
    const rootRuntime = this.environment.rootRuntime;

    if (rootRuntime !== null && rootRuntime !== this) {
      return rootRuntime.refresh(context);
    }

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const promise = this.runRefresh(context).finally(() => {
      if (this.refreshPromise === promise) {
        this.refreshPromise = null;
      }
    });

    this.refreshPromise = promise;

    return promise;
  }

  private async runRefresh(context: RouterRuntimePrepareContext): Promise<RouterRuntimeRefreshResult> {
    this.assertActive();

    if (!this.isRefreshableBranch()) {
      return { type: 'retry-navigation' };
    }

    const linkedSignal = createLinkedAbortController(context.signal);
    const abortController = linkedSignal.controller;
    const sessionRevision = context.session.revision;
    const unsubscribeSession = context.session.subscribe(() => {
      if (context.session.revision !== sessionRevision) {
        abortController.abort(new Error('Runtime refresh прерван изменением session.'));
      }
    });

    this.refreshAbortController = abortController;

    try {
      const boundaries: ActivePolicyBoundary<TPresentation>[] = [];

      this.collectActivePolicyPath(boundaries);

      const policyResult = await this.executeRefreshPolicies(boundaries, context, abortController.signal);

      if (policyResult !== null) {
        if (policyResult.decision.type === 'redirect' || policyResult.decision.type === 'redirect-to-saved-location') {
          return { decision: policyResult.decision, type: 'decision' };
        }

        this.applyRefreshBoundary(policyResult.boundary, policyResult.decision);

        if (policyResult.decision.type === 'error') {
          if (policyResult.boundary.kind === 'router') {
            await policyResult.boundary.runtime.reportRefreshFailure(policyResult.decision.error);
          } else {
            await policyResult.boundary.entry.runtime.reportBoundaryFailure(policyResult.decision.error);
          }

          return { decision: policyResult.decision, type: 'decision' };
        }

        return { type: 'refreshed' };
      }

      this.clearRefreshBoundaries();

      const routerRuntimes = boundaries.flatMap((boundary) => (boundary.kind === 'router' ? [boundary.runtime] : []));
      const routeRuntimes = boundaries.flatMap((boundary) =>
        boundary.kind === 'route' ? [boundary.entry.runtime] : [],
      );

      await Promise.all([
        ...routerRuntimes.map((runtime) => runtime.runProviderRevalidation(abortController.signal)),
        ...routeRuntimes.map((runtime) => runtime.revalidate({ signal: abortController.signal })),
      ]);
      throwIfAborted(abortController.signal);

      return { type: 'refreshed' };
    } catch (error) {
      if (abortController.signal.aborted) {
        return { type: 'refreshed' };
      }

      throw error;
    } finally {
      unsubscribeSession();
      linkedSignal.dispose();

      if (this.refreshAbortController === abortController) {
        this.refreshAbortController = null;
      }
    }
  }

  private collectActivePolicyPath(boundaries: ActivePolicyBoundary<TPresentation>[]): void {
    boundaries.push({ kind: 'router', runtime: this });

    for (const entry of this.committedBranch?.routes ?? []) {
      boundaries.push({ entry, kind: 'route' });
    }

    this.committedBranch?.child?.runtime.collectActivePolicyPath(boundaries);
  }

  private async executeRefreshPolicies(
    boundaries: readonly ActivePolicyBoundary<TPresentation>[],
    context: RouterRuntimePrepareContext,
    signal: AbortSignal,
  ): Promise<{
    readonly boundary: ActivePolicyBoundary<TPresentation>;
    readonly decision: Exclude<PolicyBoundaryDecision, { readonly type: 'continue' }>;
  } | null> {
    for (const policyBoundary of ['canMatch', 'canActivate'] as const) {
      for (const boundary of boundaries) {
        throwIfAborted(signal);

        const decision =
          boundary.kind === 'router'
            ? await boundary.runtime.policyRunner.execute(
                boundary.runtime.definition[policyBoundary],
                createPolicyContext(EMPTY_PARAMS, context, signal),
              )
            : await boundary.entry.runtime.executePolicyBoundary(
                policyBoundary,
                createPolicyContext(boundary.entry.runtime.getParams(), context, signal),
              );

        throwIfAborted(signal);

        if (decision.type !== 'continue') {
          return { boundary, decision };
        }
      }
    }

    return null;
  }

  private applyRefreshBoundary(
    boundary: ActivePolicyBoundary<TPresentation>,
    decision: Extract<PolicyBoundaryDecision, { readonly type: 'error' | 'forbidden' | 'not-found' }>,
  ): void {
    this.clearRefreshBoundaries();

    const phase = decision.type === 'error' ? 'failed' : decision.type;
    const error = decision.type === 'error' ? decision.error : null;

    if (boundary.kind === 'router') {
      boundary.runtime.refreshBoundary = { error, phase };
      boundary.runtime.emit();
      return;
    }

    boundary.entry.runtime.setRefreshBoundary(phase, error);
  }

  private clearRefreshBoundaries(): void {
    if (this.refreshBoundary !== null) {
      this.refreshBoundary = null;
      this.emit();
    }

    for (const entry of this.committedBranch?.routes ?? []) {
      entry.runtime.clearRefreshBoundary();
    }

    this.committedBranch?.child?.runtime.clearRefreshBoundaries();
  }

  private isRefreshableBranch(): boolean {
    if (this.committedBoundary !== null || this.committedBranch === null) {
      return false;
    }

    if (this.committedBranch.routes.some((entry) => !entry.runtime.isRefreshable())) {
      return false;
    }

    return this.committedBranch.child?.runtime.isRefreshableBranch() ?? true;
  }

  private isReusableBranch(): boolean {
    if (this.refreshBoundary !== null || !this.isRefreshableBranch() || this.committedBranch === null) {
      return false;
    }

    if (this.committedBranch.routes.some((entry) => !entry.runtime.isReusableForNavigation())) {
      return false;
    }

    return this.committedBranch.child?.runtime.isReusableBranch() ?? true;
  }

  private async runProviderRevalidation(signal: AbortSignal): Promise<void> {
    const pipeline = this.providerPipeline;

    if (!pipeline?.isCommitted) {
      return;
    }

    const context = createProviderContext(this.routerScope, signal);

    try {
      await pipeline.revalidate(context);
    } catch (error) {
      if (!signal.aborted) {
        this.refreshBoundary = { error, phase: 'failed' };
        this.emit();
        await this.reportRefreshFailure(error);
      }

      throw error;
    }
  }

  prepare(
    navigation: NavigationState,
    context: RouterRuntimePrepareContext,
  ): Promise<RouterRuntimePrepareResult<TPresentation>> {
    const task = this.runPrepare(navigation, context);

    this.preparationTasks.add(task);
    void task.then(
      () => this.preparationTasks.delete(task),
      () => this.preparationTasks.delete(task),
    );

    return task;
  }

  async confirm(navigation: NavigationState, context: RouterRuntimePrepareContext): Promise<boolean> {
    this.assertActive();

    const candidates = resolveNavigationCandidates(this.environment.rootRouter, navigation, this.committedNavigation);

    for (const candidate of candidates) {
      const plan = this.createPlan(candidate.target);

      try {
        stagePlanLocations(plan, candidate.navigation);
        throwIfAborted(context.signal);

        if (candidate.probeCanMatch) {
          const matches = await this.testPlanCanMatch(plan, context, context.signal);

          throwIfAborted(context.signal);

          if (!matches) {
            await this.discardPlan(plan);
            continue;
          }
        }

        const confirmed = await this.confirmNavigation(plan, context.signal);

        await this.discardPlan(plan);
        return confirmed;
      } catch (error) {
        await this.discardPlan(plan);
        throw error;
      }
    }

    return true;
  }

  subscribe(listener: RouterRuntimeListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  dispose(): Promise<void> {
    if (this.disposePromise) {
      return this.disposePromise;
    }

    if (this.snapshot.phase === 'disposed') {
      return Promise.resolve();
    }

    const promise = this.runDispose().finally(() => {
      if (this.disposePromise === promise) {
        this.disposePromise = null;
      }
    });

    this.disposePromise = promise;

    return promise;
  }

  private async runPrepare(
    navigation: NavigationState,
    context: RouterRuntimePrepareContext,
  ): Promise<RouterRuntimePrepareResult<TPresentation>> {
    this.assertActive();

    const revision = ++this.prepareRevision;
    const pendingBranchPlan = this.pendingBranchPlan;
    const pendingTransition = this.pendingTransition;

    this.refreshAbortController?.abort(new Error('Runtime refresh заменён новой навигацией.'));
    this.prepareAbortController?.abort(new Error('Router transition заменён новым переходом.'));

    if (pendingBranchPlan) {
      this.clearPendingBranch(pendingBranchPlan, true);
    }

    await pendingTransition?.transition.discard();

    if (this.isInterrupted(revision, context.signal)) {
      return createInterruptedResult(context.signal.reason);
    }

    const linkedSignal = createLinkedAbortController(context.signal);
    const abortController = linkedSignal.controller;

    this.prepareAbortController = abortController;
    this.setSnapshot({ error: null, phase: 'preparing' });

    try {
      const candidates = resolveNavigationCandidates(this.environment.rootRouter, navigation, this.committedNavigation);

      for (const candidate of candidates) {
        const result = await this.prepareCandidate(candidate, context, abortController, revision, linkedSignal.dispose);

        if (result !== null) {
          return result;
        }
      }

      linkedSignal.dispose();
      this.restoreCommittedSnapshot();

      return {
        decision: { type: 'forbidden' },
        navigation,
        type: 'decision',
      };
    } catch (error) {
      linkedSignal.dispose();

      if (this.isInterrupted(revision, context.signal)) {
        this.restoreCommittedSnapshot();
        return createInterruptedResult(context.signal.reason ?? error);
      }

      this.setSnapshot({ error, phase: this.committedBranch ? 'active' : 'idle' });
      await this.reportActivationFailure(error);
      throw error;
    } finally {
      if (this.prepareAbortController === abortController && this.pendingTransition === null) {
        this.prepareAbortController = null;
      }
    }
  }

  private async prepareCandidate(
    candidate: ResolvedNavigationCandidate,
    context: RouterRuntimePrepareContext,
    abortController: AbortController,
    revision: number,
    disposeLinkedSignal: () => void,
  ): Promise<RouterRuntimePrepareResult<TPresentation> | null> {
    const plan = this.createPlan(candidate.target);

    try {
      stagePlanLocations(plan, candidate.navigation);
      throwIfAborted(abortController.signal);

      if (candidate.probeCanMatch) {
        const matches = await this.testPlanCanMatch(plan, context, abortController.signal);

        throwIfAborted(abortController.signal);

        if (!matches) {
          await this.discardPlan(plan);
          return null;
        }
      }

      const navigationConfirmed =
        context.blockersConfirmed || (await this.confirmNavigation(plan, abortController.signal));

      throwIfAborted(abortController.signal);

      if (!navigationConfirmed) {
        await this.discardPlan(plan);
        disposeLinkedSignal();
        this.restoreCommittedSnapshot();
        return createInterruptedResult(new Error('Навигация отменена blocker-решением.'));
      }

      const canMatchResult = await this.executePlanPolicies(plan, 'canMatch', context, abortController.signal);

      throwIfAborted(abortController.signal);

      if (canMatchResult) {
        return await this.preparePolicyBoundaryResult(
          candidate.navigation,
          plan,
          canMatchResult,
          'canMatch',
          context,
          abortController,
          revision,
          disposeLinkedSignal,
        );
      }

      const canActivateResult = await this.executePlanPolicies(plan, 'canActivate', context, abortController.signal);

      throwIfAborted(abortController.signal);

      if (canActivateResult) {
        return await this.preparePolicyBoundaryResult(
          candidate.navigation,
          plan,
          canActivateResult,
          'canActivate',
          context,
          abortController,
          revision,
          disposeLinkedSignal,
        );
      }

      throwIfAborted(abortController.signal);
      this.publishPendingBranch(plan);
      const providerFailure = await this.preparePlans(
        createPlanPreparations(collectPlanPath(plan)),
        abortController.signal,
      );

      if (this.isInterrupted(revision, abortController.signal)) {
        await this.discardPlan(plan);
        disposeLinkedSignal();
        this.restoreCommittedSnapshot();
        return createInterruptedResult(abortController.signal.reason);
      }

      return this.createReadyResult(candidate.navigation, plan, abortController, disposeLinkedSignal, providerFailure);
    } catch (error) {
      const interrupted = this.isInterrupted(revision, abortController.signal);
      const interruptionReason = abortController.signal.reason;

      abortController.abort(error);
      await this.discardPlan(plan);

      if (interrupted) {
        this.restoreCommittedSnapshot();
        return createInterruptedResult(interruptionReason ?? error);
      }

      throw error;
    }
  }

  private async preparePolicyBoundaryResult(
    navigation: NavigationState,
    plan: RouterTransitionPlan<TPresentation>,
    result: RouterPlanPolicyResult<TPresentation>,
    policyBoundary: 'canActivate' | 'canMatch',
    context: RouterRuntimePrepareContext,
    abortController: AbortController,
    revision: number,
    disposeLinkedSignal: () => void,
  ): Promise<RouterRuntimePrepareResult<TPresentation>> {
    let terminalResult = result;
    const plans = collectPlanPath(plan);
    let boundaryIndex = plans.indexOf(terminalResult.plan);

    if (boundaryIndex < 0) {
      throw new Error('Policy boundary отсутствует в Router transition plan.');
    }

    if (policyBoundary === 'canMatch') {
      for (const ancestorPlan of plans.slice(0, boundaryIndex)) {
        const canActivateResult = await this.executeLocalPlanPolicies(
          ancestorPlan,
          'canActivate',
          context,
          abortController.signal,
        );

        if (canActivateResult) {
          terminalResult = canActivateResult;
          boundaryIndex = plans.indexOf(terminalResult.plan);
          break;
        }
      }

      if (terminalResult === result && terminalResult.owner.kind === 'route') {
        const canActivateResult = await this.executeRouteAncestorCanActivatePolicies(
          terminalResult.plan,
          terminalResult.owner.entry,
          context,
          abortController.signal,
        );

        if (canActivateResult) {
          terminalResult = canActivateResult;
          boundaryIndex = plans.indexOf(terminalResult.plan);
        }
      }
    }

    if (terminalResult.decision.type === 'redirect' || terminalResult.decision.type === 'redirect-to-saved-location') {
      await this.discardPlan(plan);
      disposeLinkedSignal();
      return this.applyPolicyDecision(terminalResult.decision, navigation);
    }

    if (terminalResult.decision.type === 'continue') {
      throw new Error('Policy boundary result не может содержать continue.');
    }

    const error = terminalResult.decision.type === 'error' ? terminalResult.decision.error : null;
    const phase = terminalResult.decision.type === 'error' ? 'failed' : terminalResult.decision.type;
    const boundary: RuntimeBoundaryTransition<TPresentation> =
      terminalResult.owner.kind === 'route'
        ? {
            entry: terminalResult.owner.entry,
            error,
            kind: 'route',
            origin: 'policy',
            phase,
            plan: terminalResult.plan,
          }
        : {
            error,
            kind: 'router',
            phase,
            plan: terminalResult.plan,
          };
    const preparations =
      boundary.kind === 'route'
        ? createPreparationsBeforeRouteBoundary(plans, boundary)
        : createPlanPreparations(plans.slice(0, boundaryIndex));
    this.publishPendingBranch(plan);
    const providerFailure = await this.preparePlans(preparations, abortController.signal);

    if (this.isInterrupted(revision, abortController.signal)) {
      await this.discardPlan(plan);
      disposeLinkedSignal();
      this.restoreCommittedSnapshot();
      return createInterruptedResult(abortController.signal.reason);
    }

    if (boundary.error !== null) {
      if (boundary.kind === 'route') {
        await boundary.entry.runtime.reportBoundaryFailure(boundary.error);
      } else {
        await terminalResult.plan.runtime.reportActivationFailure(boundary.error);
      }
    }

    return this.createReadyResult(navigation, plan, abortController, disposeLinkedSignal, providerFailure ?? boundary);
  }

  private confirmNavigation(plan: RouterTransitionPlan<TPresentation>, signal: AbortSignal): Promise<boolean> {
    const confirm = this.environment.execution.confirmNavigation;

    if (!confirm) {
      return Promise.resolve(true);
    }

    const nextRuntimes = new Set(collectPlanRouteRuntimes(plan));
    const leavingBoundaries = collectBranchRouteRuntimes(plan.previousBranch)
      .filter((runtime) => !nextRuntimes.has(runtime))
      .reverse()
      .map((runtime) => runtime.getNavigationBlockerBoundary());

    return leavingBoundaries.length === 0 ? Promise.resolve(true) : confirm(Object.freeze(leavingBoundaries), signal);
  }

  private async preparePlans(
    preparations: readonly RouterPlanPreparation<TPresentation>[],
    signal: AbortSignal,
  ): Promise<RuntimeBoundaryTransition<TPresentation> | null> {
    const providerPreparations = preparations.map(({ plan }) => this.preparePlanProvider(plan, signal));
    const [, providerFailures] = await Promise.all([
      this.preparePlanRoutes(preparations, signal),
      Promise.all(providerPreparations),
    ]);
    const providerFailure = providerFailures.find((failure) => failure !== null) ?? null;
    const routeFailure = findPreparedRouteFailure(preparations);
    const boundary = selectEarlierBoundary(preparations, providerFailure, routeFailure);
    const boundaryIndex = boundary
      ? preparations.findIndex((preparation) => preparation.plan === boundary.plan)
      : preparations.length - 1;
    const activatedPlans = preparations.slice(0, boundaryIndex + 1).map(({ plan }) => plan);
    const activationFailure = await this.activatePlanProviders(activatedPlans, signal);
    const effectiveBoundary = activationFailure ?? boundary;
    const effectiveBoundaryIndex = effectiveBoundary
      ? preparations.findIndex((preparation) => preparation.plan === effectiveBoundary.plan)
      : preparations.length - 1;

    await Promise.all(
      preparations.slice(effectiveBoundaryIndex + 1).map(({ plan }) => plan.runtime.providerPipeline?.discard()),
    );

    return effectiveBoundary;
  }

  private async preparePlanRoutes(
    preparations: readonly RouterPlanPreparation<TPresentation>[],
    signal: AbortSignal,
  ): Promise<void> {
    await Promise.all(
      preparations
        .flatMap((preparation) => preparation.routes)
        .map((entry) => {
          return entry.runtime.prepare({ params: entry.resolved.params, signal });
        }),
    );
  }

  private async preparePlanProvider(
    plan: RouterTransitionPlan<TPresentation>,
    signal: AbortSignal,
  ): Promise<RouterBoundaryTransition<TPresentation> | null> {
    if (!plan.localChanged || plan.runtime.definition.providers.length === 0) {
      return null;
    }

    const pipeline = plan.runtime.getOrCreateProviderPipeline();

    if (pipeline.isCommitted) return null;

    try {
      const providerContext = createProviderContext(plan.runtime.routerScope, signal);

      await pipeline.initialize(providerContext);
      await pipeline.prepare(providerContext);

      return null;
    } catch (error) {
      if (signal.aborted) {
        throw signal.reason ?? error;
      }

      await plan.runtime.reportActivationFailure(error);
      await plan.runtime.disposeProviderPipeline();

      return { error, kind: 'router', phase: 'failed', plan };
    }
  }

  private async activatePlanProviders(
    plans: readonly RouterTransitionPlan<TPresentation>[],
    signal: AbortSignal,
  ): Promise<RouterBoundaryTransition<TPresentation> | null> {
    let failure: RouterBoundaryTransition<TPresentation> | null = null;

    for (const plan of [...plans].reverse()) {
      const pipeline = plan.runtime.providerPipeline;

      if (!pipeline || pipeline.isCommitted || !plan.localChanged) continue;

      try {
        await pipeline.activate(createProviderContext(plan.runtime.routerScope, signal));
      } catch (error) {
        if (signal.aborted) throw signal.reason ?? error;

        await plan.runtime.reportActivationFailure(error);
        await plan.runtime.disposeProviderPipeline();
        failure = { error, kind: 'router', phase: 'failed', plan };
      }
    }

    return failure;
  }

  private createReadyResult(
    navigation: NavigationState,
    plan: RouterTransitionPlan<TPresentation>,
    abortController: AbortController,
    disposeLinkedSignal: () => void,
    boundary: RuntimeBoundaryTransition<TPresentation> | null,
  ): RouterRuntimePrepareResult<TPresentation> {
    const previousNavigation = this.committedNavigation;
    let pending!: PendingRouterTransition<TPresentation>;
    const transition = new PreparedRouterTransition<TPresentation>({
      commit: () => this.commitPreparedTransition(pending),
      complete: async ({ signal }) => {
        const plans = resolveNavigationRevalidationPlans(plan, navigation, previousNavigation);

        if (plans.length === 0 || signal.aborted) {
          return;
        }

        await Promise.all(
          plans.flatMap((target) => [
            target.runtime.runProviderRevalidation(signal),
            ...target.nextRoutes.map((entry) => entry.runtime.revalidate({ signal })),
          ]),
        );
      },
      discard: () => this.discardPreparedTransition(pending),
      getRouteRuntimes: () => Object.freeze(collectPlanRouteRuntimes(plan)),
      navigation,
    });

    pending = {
      abortController,
      boundary,
      disposeLinkedSignal,
      navigation,
      plan,
      transition,
    };
    this.pendingTransition = pending;
    abortController.signal.addEventListener(
      'abort',
      () => {
        void transition.discard().catch(() => undefined);
      },
      { once: true },
    );
    this.setSnapshot({ error: null, phase: 'pending' });

    return { transition, type: 'ready' };
  }

  private async commitPreparedTransition(pending: PendingRouterTransition<TPresentation>): Promise<void> {
    if (this.pendingTransition !== pending) {
      throw new Error('Router transition больше не является текущим.');
    }

    if (pending.abortController.signal.aborted) {
      await this.discardPreparedPlan(pending);
      throw pending.abortController.signal.reason ?? new Error('Router transition был прерван.');
    }

    this.clearRefreshBoundaries();
    this.clearPendingBranch(pending.plan, false);

    for (const plan of collectPlanPath(pending.plan)) {
      if (plan.runtime.providerPipeline?.hasPendingCommit) {
        plan.runtime.providerPipeline.commit();
      }
    }

    if (pending.boundary) {
      this.commitPlanRouteRuntimesBeforeBoundary(pending.plan, pending.boundary);
      this.applyBoundaryPlan(pending.plan, pending.boundary);
    } else {
      this.commitPlanRouteRuntimes(pending.plan);
      this.applyPlan(pending.plan);
    }

    this.committedNavigation = pending.navigation;
    this.releasePendingTransition(pending);

    if (pending.boundary) {
      await this.disposeBoundaryReplacedBranch(pending.plan, pending.boundary);

      if (pending.boundary.kind === 'route') {
        await this.discardPlanAfterRouteBoundary(pending.boundary.plan, pending.boundary.entry);
      } else {
        await this.discardPlan(pending.boundary.plan);
      }
    } else {
      this.setSnapshot({ error: null, phase: 'active' });
      await this.disposeReplacedBranch(pending.plan);
    }
  }

  private async discardPreparedTransition(pending: PendingRouterTransition<TPresentation>): Promise<void> {
    if (this.pendingTransition !== pending) {
      return;
    }

    await this.discardPreparedPlan(pending);
  }

  private async discardPreparedPlan(pending: PendingRouterTransition<TPresentation>): Promise<void> {
    this.releasePendingTransition(pending);
    await this.discardPlan(pending.plan);
    this.restoreCommittedSnapshot();
  }

  private releasePendingTransition(pending: PendingRouterTransition<TPresentation>): void {
    if (this.pendingTransition === pending) {
      this.pendingTransition = null;
    }

    if (this.prepareAbortController === pending.abortController) {
      this.prepareAbortController = null;
    }

    pending.disposeLinkedSignal();
  }

  private createPlan(target: ResolvedRouterTarget): RouterTransitionPlan<TPresentation> {
    if (target.router !== this.router) {
      throw new Error('Resolved target принадлежит другому RouterRuntime.');
    }

    const previousBranch = this.committedBranch;
    this.queryService?.stage(target.query);
    const previousRoutes = previousBranch?.routes ?? [];
    const commonRouteCount = this.isReusableBranch() ? getCommonRouteCount(previousRoutes, target.routes) : 0;
    const nextRoutes: RuntimeRouteEntry<TPresentation>[] = [...previousRoutes.slice(0, commonRouteCount)];
    const createdRoutes: RuntimeRouteEntry<TPresentation>[] = [];
    let parentScope: RuntimeScope =
      commonRouteCount > 0 ? nextRoutes[commonRouteCount - 1]!.runtime.getRouteScope() : this.routerScope;

    for (const resolved of target.routes.slice(commonRouteCount)) {
      const runtime = new RouteRuntime(
        resolved.node.route,
        parentScope,
        this.environment.exportResolver,
        this.getRouteRuntimeId(resolved),
        {
          executeAction: (execution) => this.executeRouteAction(execution),
          onRenderFailure: (failedRuntime, error) => this.trimCommittedRouteBranch(failedRuntime, error),
        },
      );
      const entry = Object.freeze({ resolved, runtime });

      createdRoutes.push(entry);
      nextRoutes.push(entry);
      parentScope = runtime.getRouteScope();
    }

    let childPlan: RouterTransitionPlan<TPresentation> | null = null;
    let createdChild = false;
    let nextChild: RouterRuntime<TPresentation> | null = null;
    let nextChildOwner: RouteRuntime<TPresentation> | null = null;

    if (target.child) {
      const childOwnerIndex = nextRoutes.findIndex((entry) => entry.resolved.node.route === target.child!.owner);

      if (childOwnerIndex < 0) {
        throw new Error('Nested Router target не содержит активную owner Route.');
      }

      const childOwner = nextRoutes[childOwnerIndex]!;
      nextChildOwner = childOwner.runtime;
      const canReuseChild =
        previousBranch?.child !== null &&
        previousBranch?.child !== undefined &&
        previousBranch.child.runtime.router === target.child.router &&
        previousBranch.child.runtime.isReusableBranch() &&
        childOwnerIndex < commonRouteCount;

      nextChild = canReuseChild
        ? previousBranch!.child!.runtime
        : new RouterRuntime(
            target.child.router,
            childOwner.runtime.getRouteScope(),
            this.environment.exportResolver,
            this.environment.execution,
            this.getRouterRuntimeId(target.child.router),
            this.environment,
          );
      createdChild = !canReuseChild;
      childPlan = nextChild!.createPlan(target.child);
    }

    return {
      childPlan,
      commonRouteCount,
      createdChild,
      createdRoutes: Object.freeze(createdRoutes),
      localChanged: commonRouteCount !== previousRoutes.length || commonRouteCount !== target.routes.length,
      nextChild,
      nextChildOwner,
      nextRoutes: Object.freeze(nextRoutes),
      previousBranch,
      query: target.query,
      runtime: this,
    };
  }

  private async testPlanCanMatch(
    plan: RouterTransitionPlan<TPresentation>,
    context: RouterRuntimePrepareContext,
    signal: AbortSignal,
  ): Promise<boolean> {
    throwIfAborted(signal);

    if (plan.localChanged) {
      if (
        !(await plan.runtime.policyRunner.test(
          plan.runtime.definition.canMatch,
          createPolicyContext(EMPTY_PARAMS, context, signal),
        ))
      ) {
        return false;
      }

      throwIfAborted(signal);

      for (const entry of plan.createdRoutes) {
        if (!(await entry.runtime.testCanMatch(createPolicyContext(entry.resolved.params, context, signal)))) {
          return false;
        }

        throwIfAborted(signal);
      }
    }

    return plan.childPlan ? await this.testPlanCanMatch(plan.childPlan, context, signal) : true;
  }

  private async executePlanPolicies(
    plan: RouterTransitionPlan<TPresentation>,
    boundary: 'canActivate' | 'canMatch',
    context: RouterRuntimePrepareContext,
    signal: AbortSignal,
  ): Promise<RouterPlanPolicyResult<TPresentation> | null> {
    throwIfAborted(signal);

    const localResult = await this.executeLocalPlanPolicies(plan, boundary, context, signal);

    if (localResult) {
      return localResult;
    }

    return plan.childPlan ? await this.executePlanPolicies(plan.childPlan, boundary, context, signal) : null;
  }

  private async executeLocalPlanPolicies(
    plan: RouterTransitionPlan<TPresentation>,
    boundary: 'canActivate' | 'canMatch',
    context: RouterRuntimePrepareContext,
    signal: AbortSignal,
  ): Promise<RouterPlanPolicyResult<TPresentation> | null> {
    throwIfAborted(signal);

    if (plan.localChanged) {
      const routerDecision = await plan.runtime.policyRunner.execute(
        plan.runtime.definition[boundary],
        createPolicyContext(EMPTY_PARAMS, context, signal),
      );

      throwIfAborted(signal);

      if (routerDecision.type !== 'continue') {
        return { decision: routerDecision, owner: { kind: 'router' }, plan };
      }

      for (const entry of plan.createdRoutes) {
        const routeDecision = await entry.runtime.executePolicyBoundary(
          boundary,
          createPolicyContext(entry.resolved.params, context, signal),
        );

        throwIfAborted(signal);

        if (routeDecision.type !== 'continue') {
          return { decision: routeDecision, owner: { entry, kind: 'route' }, plan };
        }
      }
    }

    return null;
  }

  private async executeRouteAncestorCanActivatePolicies(
    plan: RouterTransitionPlan<TPresentation>,
    boundaryEntry: RuntimeRouteEntry<TPresentation>,
    context: RouterRuntimePrepareContext,
    signal: AbortSignal,
  ): Promise<RouterPlanPolicyResult<TPresentation> | null> {
    throwIfAborted(signal);

    const routerDecision = await plan.runtime.policyRunner.execute(
      plan.runtime.definition.canActivate,
      createPolicyContext(EMPTY_PARAMS, context, signal),
    );

    throwIfAborted(signal);

    if (routerDecision.type !== 'continue') {
      return { decision: routerDecision, owner: { kind: 'router' }, plan };
    }

    for (const entry of plan.createdRoutes) {
      if (entry === boundaryEntry) {
        return null;
      }

      const routeDecision = await entry.runtime.executePolicyBoundary(
        'canActivate',
        createPolicyContext(entry.resolved.params, context, signal),
      );

      throwIfAborted(signal);

      if (routeDecision.type !== 'continue') {
        return { decision: routeDecision, owner: { entry, kind: 'route' }, plan };
      }
    }

    throw new Error('Route policy boundary отсутствует в created Route runtimes transition plan.');
  }

  private applyPolicyDecision(
    decision: PolicyBoundaryDecision,
    navigation: NavigationState,
  ): RouterRuntimePrepareResult<TPresentation> {
    this.restoreCommittedSnapshot();

    if (decision.type === 'error') {
      throw decision.error;
    }

    return { decision, navigation, type: 'decision' };
  }

  private commitPlanRouteRuntimes(plan: RouterTransitionPlan<TPresentation>): void {
    for (const entry of plan.createdRoutes) {
      entry.runtime.commit();
    }

    if (plan.childPlan) {
      this.commitPlanRouteRuntimes(plan.childPlan);
    }
  }

  private commitPlanRouteRuntimesBeforeBoundary(
    plan: RouterTransitionPlan<TPresentation>,
    boundary: RuntimeBoundaryTransition<TPresentation>,
  ): void {
    if (plan === boundary.plan) {
      if (boundary.kind === 'route') {
        for (const entry of plan.createdRoutes) {
          if (entry === boundary.entry) {
            if (boundary.origin === 'policy') {
              entry.runtime.commitBoundary(boundary.phase, boundary.error, entry.resolved.params);
            } else {
              entry.runtime.commit();
            }

            return;
          }

          entry.runtime.commit();
        }

        throw new Error('Route boundary отсутствует в created Route runtimes transition plan.');
      }

      return;
    }

    for (const entry of plan.createdRoutes) {
      entry.runtime.commit();
    }

    if (plan.childPlan) {
      this.commitPlanRouteRuntimesBeforeBoundary(plan.childPlan, boundary);
    }
  }

  private applyPlan(plan: RouterTransitionPlan<TPresentation>): void {
    plan.runtime.committedBranch = {
      child:
        plan.nextChild && plan.nextChildOwner
          ? Object.freeze({ owner: plan.nextChildOwner, runtime: plan.nextChild })
          : null,
      routes: plan.nextRoutes,
    };
    plan.runtime.committedBoundary = null;
    plan.runtime.snapshot = { error: null, phase: 'active' };

    if (plan.childPlan) {
      this.applyPlan(plan.childPlan);
    }

    if (plan.runtime !== this) {
      plan.runtime.emit();
    }
  }

  private applyBoundaryPlan(
    plan: RouterTransitionPlan<TPresentation>,
    boundary: RuntimeBoundaryTransition<TPresentation>,
  ): void {
    if (plan === boundary.plan) {
      if (boundary.kind === 'route') {
        const boundaryIndex = plan.nextRoutes.indexOf(boundary.entry);

        if (boundaryIndex < 0) {
          throw new Error('Route boundary отсутствует в next Route runtimes transition plan.');
        }

        plan.runtime.committedBranch = {
          child: null,
          routes: Object.freeze(plan.nextRoutes.slice(0, boundaryIndex + 1)),
        };
        plan.runtime.committedBoundary = null;
        plan.runtime.snapshot = { error: null, phase: 'active' };
      } else {
        plan.runtime.committedBranch = null;
        plan.runtime.committedBoundary = { error: boundary.error, phase: boundary.phase };
        plan.runtime.snapshot = plan.runtime.committedBoundary;
      }

      if (plan.runtime !== this) {
        plan.runtime.emit();
      } else {
        this.emit();
      }

      return;
    }

    plan.runtime.committedBranch = {
      child:
        plan.nextChild && plan.nextChildOwner
          ? Object.freeze({ owner: plan.nextChildOwner, runtime: plan.nextChild })
          : null,
      routes: plan.nextRoutes,
    };
    plan.runtime.committedBoundary = null;
    plan.runtime.snapshot = { error: null, phase: 'active' };

    if (!plan.childPlan) {
      throw new Error('Boundary Router отсутствует в дочернем transition plan.');
    }

    this.applyBoundaryPlan(plan.childPlan, boundary);

    if (plan.runtime !== this) {
      plan.runtime.emit();
    } else {
      this.emit();
    }
  }

  private async disposeReplacedBranch(plan: RouterTransitionPlan<TPresentation>): Promise<void> {
    const previousChild = plan.previousBranch?.child?.runtime ?? null;

    if (previousChild && previousChild !== plan.nextChild) {
      await previousChild.dispose();
    } else if (plan.childPlan) {
      await this.disposeReplacedBranch(plan.childPlan);
    }

    const replacedRoutes = plan.previousBranch?.routes.slice(plan.commonRouteCount).reverse() ?? [];

    for (const entry of replacedRoutes) {
      await this.disposeRouteRuntime(entry.runtime, 'route.dispose');
    }
  }

  private async disposeBoundaryReplacedBranch(
    plan: RouterTransitionPlan<TPresentation>,
    boundary: RuntimeBoundaryTransition<TPresentation>,
  ): Promise<void> {
    if (plan === boundary.plan) {
      if (boundary.kind === 'router') {
        await plan.runtime.disposeBranch(plan.previousBranch);
        return;
      }

      if (plan.previousBranch?.child) {
        await plan.previousBranch.child.runtime.dispose();
      }

      const replacedRoutes = plan.previousBranch?.routes.slice(plan.commonRouteCount).reverse() ?? [];

      for (const entry of replacedRoutes) {
        await this.disposeRouteRuntime(entry.runtime, 'route.dispose');
      }

      return;
    }

    const previousChild = plan.previousBranch?.child?.runtime ?? null;

    if (previousChild && previousChild !== plan.nextChild) {
      await previousChild.dispose();
    } else if (plan.childPlan) {
      await this.disposeBoundaryReplacedBranch(plan.childPlan, boundary);
    }

    const replacedRoutes = plan.previousBranch?.routes.slice(plan.commonRouteCount).reverse() ?? [];

    for (const entry of replacedRoutes) {
      await this.disposeRouteRuntime(entry.runtime, 'route.dispose');
    }
  }

  private async discardPlan(plan: RouterTransitionPlan<TPresentation>): Promise<void> {
    this.clearPendingBranch(plan, true);
    plan.runtime.queryService?.discardPending();
    await plan.runtime.providerPipeline?.discard();

    if (plan.childPlan) {
      await this.discardPlan(plan.childPlan);
    }

    if (plan.createdChild && plan.nextChild) {
      await plan.nextChild.dispose();
    }

    for (const entry of [...plan.createdRoutes].reverse()) {
      entry.runtime.discardPending();
      await this.disposeRouteRuntime(entry.runtime, 'route.discard');
    }
  }

  private async discardPlanAfterRouteBoundary(
    plan: RouterTransitionPlan<TPresentation>,
    boundaryEntry: RuntimeRouteEntry<TPresentation>,
  ): Promise<void> {
    if (plan.childPlan) {
      await this.discardPlan(plan.childPlan);
    }

    if (plan.createdChild && plan.nextChild) {
      await plan.nextChild.dispose();
    }

    const boundaryIndex = plan.createdRoutes.indexOf(boundaryEntry);

    if (boundaryIndex < 0) {
      throw new Error('Route boundary отсутствует в created Route runtimes transition plan.');
    }

    for (const entry of [...plan.createdRoutes.slice(boundaryIndex + 1)].reverse()) {
      entry.runtime.discardPending();
      await this.disposeRouteRuntime(entry.runtime, 'route.discard');
    }
  }

  private async runDispose(): Promise<void> {
    this.prepareRevision += 1;
    const pendingTransition = this.pendingTransition;

    this.snapshot = { error: null, phase: 'disposing' };
    this.emit();
    this.lifecycleAbortController.abort(new Error('RouterRuntime освобождён.'));
    this.refreshAbortController?.abort(new Error('RouterRuntime освобождён.'));
    this.prepareAbortController?.abort(new Error('RouterRuntime освобождён.'));
    await pendingTransition?.transition.discard();
    await Promise.allSettled([...this.preparationTasks, ...(this.refreshPromise ? [this.refreshPromise] : [])]);

    const branch = this.committedBranch;

    this.committedBoundary = null;
    this.committedBranch = null;
    this.committedNavigation = undefined;
    this.refreshBoundary = null;
    this.snapshot = { error: null, phase: 'disposed' };
    this.emit();

    await this.disposeBranch(branch);
    await this.disposeProviderPipeline();

    try {
      this.queryService?.dispose();
      this.routerScope.dispose();
    } catch (error) {
      await this.reportCleanupFailure(error, 'scope.dispose');
    }

    this.listeners.clear();
  }

  private async disposeBranch(branch: RouterRuntimeBranch<TPresentation> | null): Promise<void> {
    if (branch?.child) {
      await branch.child.runtime.dispose();
    }

    for (const entry of [...(branch?.routes ?? [])].reverse()) {
      await this.disposeRouteRuntime(entry.runtime, 'route.dispose');
    }
  }

  private async disposeRouteRuntime(runtime: RouteRuntime<TPresentation>, operation: string): Promise<void> {
    try {
      await runtime.dispose();
    } catch (error) {
      await this.reportCleanupFailure(error, operation);
    }
  }

  private async reportActivationFailure(error: unknown): Promise<void> {
    const failure = captureRuntimeFailure(error, {
      operation: 'prepare',
      owner: this.owner,
      participant: { kind: 'runtime' },
    });

    await reportRuntimeFailure(
      this.routerScope.get(RuntimeFailureReporterInterface),
      failure,
      this.owner,
      'route.activation-failed',
      this.committedBranch ? 'active' : 'idle',
    );
  }

  private async reportRenderFailure(error: unknown): Promise<void> {
    const failure = captureRuntimeFailure(error, {
      operation: 'render',
      owner: this.owner,
      participant: { kind: 'runtime' },
    });

    await reportRuntimeFailure(
      this.routerScope.get(RuntimeFailureReporterInterface),
      failure,
      this.owner,
      'route.activation-failed',
      'failed',
    );
  }

  private async reportActionFailure(error: unknown): Promise<void> {
    const failure = captureRuntimeFailure(error, {
      operation: 'action',
      owner: this.owner,
      participant: { kind: 'runtime' },
    });

    await reportRuntimeFailure(
      this.routerScope.get(RuntimeFailureReporterInterface),
      failure,
      this.owner,
      'action.failed',
      'active',
    );
  }

  private async reportRefreshFailure(error: unknown): Promise<void> {
    const failure = captureRuntimeFailure(error, {
      operation: 'revalidate',
      owner: this.owner,
      participant: { kind: 'runtime' },
    });

    await reportRuntimeFailure(
      this.routerScope.get(RuntimeFailureReporterInterface),
      failure,
      this.owner,
      'revalidate.failed',
      'failed',
    );
  }

  private async reportCleanupFailure(error: unknown, operation: string): Promise<void> {
    const failure = captureRuntimeFailure(error, {
      operation,
      owner: this.owner,
      participant: { kind: 'runtime' },
    });

    await reportRuntimeFailure(
      this.routerScope.get(RuntimeFailureReporterInterface),
      failure,
      this.owner,
      'cleanup.contained',
      'disposing',
    );
  }

  private getRouteRuntimeId(entry: ResolvedRouteEntry): string {
    const index = this.environment.routeIndexes.get(entry.node.route);

    if (index === undefined) {
      throw new Error('Route отсутствует в RouterRuntime environment.');
    }

    return `route:${index}`;
  }

  private getOrCreateProviderPipeline(): ProviderPipeline {
    this.providerPipeline ??= new ProviderPipeline(this.routerScope, this.definition.providers, this.owner);

    return this.providerPipeline;
  }

  private async disposeProviderPipeline(): Promise<void> {
    const pipeline = this.providerPipeline;

    this.providerPipeline = null;
    await pipeline?.dispose();
  }

  private getRouterRuntimeId(router: RouterDeclaration): string {
    const index = this.environment.routerIndexes.get(router);

    if (index === undefined) {
      throw new Error('Router отсутствует в RouterRuntime environment.');
    }

    return `router:${index}`;
  }

  private isInterrupted(revision: number, signal: AbortSignal): boolean {
    return (
      revision !== this.prepareRevision ||
      signal.aborted ||
      this.snapshot.phase === 'disposed' ||
      this.snapshot.phase === 'disposing'
    );
  }

  private restoreCommittedSnapshot(): void {
    if (this.snapshot.phase === 'disposed' || this.snapshot.phase === 'disposing') {
      return;
    }

    this.setSnapshot(this.committedBoundary ?? { error: null, phase: this.committedBranch ? 'active' : 'idle' });
  }

  private publishPendingBranch(plan: RouterTransitionPlan<TPresentation>): void {
    const plans = collectPlanPath(plan);

    for (const pendingPlan of plans) {
      if (pendingPlan.runtime.pendingBranchPlan !== null) {
        throw new Error('RouterRuntime уже содержит опубликованную pending-ветку.');
      }

      pendingPlan.runtime.pendingBranchPlan = pendingPlan;
    }

    for (const pendingPlan of plans) {
      pendingPlan.runtime.emitBranchChange();
    }
  }

  private clearPendingBranch(plan: RouterTransitionPlan<TPresentation>, notify: boolean): void {
    const runtimes: RouterRuntime<TPresentation>[] = [];

    for (const pendingPlan of collectPlanPath(plan)) {
      if (pendingPlan.runtime.pendingBranchPlan !== pendingPlan) {
        continue;
      }

      pendingPlan.runtime.pendingBranchPlan = null;
      runtimes.push(pendingPlan.runtime);
    }

    if (notify) {
      for (const runtime of runtimes) {
        runtime.emitBranchChange();
      }
    }
  }

  private emitBranchChange(): void {
    if (this.refreshBoundary) {
      this.refreshBoundary = { ...this.refreshBoundary };
    } else {
      this.snapshot = { ...this.snapshot };
    }

    this.emit();
  }

  private setSnapshot(snapshot: RouterRuntimeSnapshot): void {
    this.snapshot = snapshot;
    this.emit();
  }

  private emit(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private assertActive(): void {
    if (this.snapshot.phase === 'disposed' || this.snapshot.phase === 'disposing') {
      throw new Error('RouterRuntime уже освобождён.');
    }
  }
}

const createEnvironment = <TPresentation>(
  rootRouter: RouterDeclaration,
  exportResolver: ModuleExportResolverInterface<TPresentation>,
  execution: RouterRuntimeExecutionContext,
): RouterRuntimeEnvironment<TPresentation> => {
  const graph = getRouterGraph(rootRouter);
  const routers: RouterDeclaration[] = [rootRouter];

  for (const node of graph.nodes) {
    if (!routers.includes(node.router)) {
      routers.push(node.router);
    }
  }

  return {
    execution,
    exportResolver,
    rootRouter,
    routeIndexes: new Map(graph.nodes.map((node, index) => [node.route, index])),
    rootRuntime: null,
    routerIndexes: new Map(routers.map((router, index) => [router, index])),
  };
};

const getCommonRouteCount = <TPresentation>(
  current: readonly RuntimeRouteEntry<TPresentation>[],
  target: readonly ResolvedRouteEntry[],
): number => {
  const length = Math.min(current.length, target.length);
  let index = 0;

  while (
    index < length &&
    current[index]!.resolved.node === target[index]!.node &&
    current[index]!.runtime.isReusableForNavigation() &&
    areNavigationParamsEqual(current[index]!.resolved.params, target[index]!.params)
  ) {
    index += 1;
  }

  return index;
};

const resolveNavigationRevalidationPlans = <TPresentation>(
  plan: RouterTransitionPlan<TPresentation>,
  navigation: NavigationState,
  previous: NavigationState | undefined,
): readonly RouterTransitionPlan<TPresentation>[] => {
  if (!navigation.revalidation || hasPlanChanges(plan)) {
    return [];
  }

  const plans = collectPlanPath(plan);

  switch (navigation.revalidation.kind) {
    case 'branch':
      return plans;
    case 'router': {
      const router = navigation.revalidation.router;
      return plans.filter((candidate) => candidate.runtime.router === router);
    }
    case 'restore': {
      const changed = previous ? collectChangedQueryRouters(previous.root, navigation.root) : [];
      return changed.length > 0 ? plans.filter((candidate) => changed.includes(candidate.runtime.router)) : plans;
    }
  }
};

const collectChangedQueryRouters = (
  previous: NavigationRouterState,
  current: NavigationRouterState,
): readonly RouterDeclaration[] => {
  const routers: RouterDeclaration[] = [];
  let left: NavigationRouterState | null = previous;
  let right: NavigationRouterState | null = current;

  while (left && right && left.router === right.router) {
    if (!areNavigationQueriesEqual(left.query, right.query)) routers.push(right.router);
    left = left.child;
    right = right.child;
  }

  return routers;
};

const hasPlanChanges = <TPresentation>(plan: RouterTransitionPlan<TPresentation>): boolean => {
  return plan.localChanged || (plan.childPlan !== null && hasPlanChanges(plan.childPlan));
};

const stagePlanLocations = <TPresentation>(
  plan: RouterTransitionPlan<TPresentation>,
  navigation: NavigationState,
): void => {
  for (const entry of plan.createdRoutes) {
    entry.runtime.stageLocation(entry.resolved.params, navigation.state);
  }

  if (plan.childPlan) {
    stagePlanLocations(plan.childPlan, navigation);
  }
};

const collectPlanPath = <TPresentation>(
  root: RouterTransitionPlan<TPresentation>,
): readonly RouterTransitionPlan<TPresentation>[] => {
  const plans: RouterTransitionPlan<TPresentation>[] = [];
  let plan: RouterTransitionPlan<TPresentation> | null = root;

  while (plan) {
    plans.push(plan);
    plan = plan.childPlan;
  }

  return plans;
};

const createPlanPreparations = <TPresentation>(
  plans: readonly RouterTransitionPlan<TPresentation>[],
): readonly RouterPlanPreparation<TPresentation>[] => {
  return plans.map((plan) => ({ plan, routes: plan.createdRoutes }));
};

const createPreparationsBeforeRouteBoundary = <TPresentation>(
  plans: readonly RouterTransitionPlan<TPresentation>[],
  boundary: RouteBoundaryTransition<TPresentation>,
): readonly RouterPlanPreparation<TPresentation>[] => {
  const boundaryPlanIndex = plans.indexOf(boundary.plan);
  const boundaryRouteIndex = boundary.plan.createdRoutes.indexOf(boundary.entry);

  if (boundaryPlanIndex < 0 || boundaryRouteIndex < 0) {
    throw new Error('Route policy boundary отсутствует в transition plan.');
  }

  return plans.slice(0, boundaryPlanIndex + 1).map((plan) => ({
    plan,
    routes: plan === boundary.plan ? plan.createdRoutes.slice(0, boundaryRouteIndex) : plan.createdRoutes,
  }));
};

const findPreparedRouteFailure = <TPresentation>(
  preparations: readonly RouterPlanPreparation<TPresentation>[],
): RouteBoundaryTransition<TPresentation> | null => {
  for (const preparation of preparations) {
    for (const entry of preparation.routes) {
      const failure = entry.runtime.getPendingFailureOrNull();

      if (failure) {
        return {
          entry,
          error: failure.error,
          kind: 'route',
          origin: 'runtime',
          phase: 'failed',
          plan: preparation.plan,
        };
      }
    }
  }

  return null;
};

const selectEarlierBoundary = <TPresentation>(
  preparations: readonly RouterPlanPreparation<TPresentation>[],
  providerFailure: RouterBoundaryTransition<TPresentation> | null,
  routeFailure: RouteBoundaryTransition<TPresentation> | null,
): RuntimeBoundaryTransition<TPresentation> | null => {
  if (!providerFailure) return routeFailure;
  if (!routeFailure) return providerFailure;

  const providerIndex = preparations.findIndex(({ plan }) => plan === providerFailure.plan);
  const routeIndex = preparations.findIndex(({ plan }) => plan === routeFailure.plan);

  return providerIndex <= routeIndex ? providerFailure : routeFailure;
};

const collectPlanRouteRuntimes = <TPresentation>(
  plan: RouterTransitionPlan<TPresentation>,
): RouteRuntime<TPresentation>[] => {
  return [
    ...plan.nextRoutes.map((entry) => entry.runtime),
    ...(plan.childPlan ? collectPlanRouteRuntimes(plan.childPlan) : []),
  ];
};

const collectBranchRouteRuntimes = <TPresentation>(
  branch: RouterRuntimeBranch<TPresentation> | null,
): RouteRuntime<TPresentation>[] => {
  if (!branch) {
    return [];
  }

  return [
    ...branch.routes.map((entry) => entry.runtime),
    ...(branch.child ? branch.child.runtime.getActiveRouteRuntimes() : []),
  ];
};

const createPolicyContext = (
  params: Readonly<Record<string, unknown>>,
  context: RouterRuntimePrepareContext,
  signal: AbortSignal,
): RouteRuntimeContextInterface => ({
  app: context.app,
  params,
  session: context.session,
  signal,
});

const createProviderContext = (scope: RuntimeScope, signal: AbortSignal) => ({
  params: {},
  props: EMPTY_PROPS,
  scope,
  signal,
});

const createLinkedAbortController = (signal: AbortSignal) => {
  const controller = new AbortController();
  const abort = (): void => controller.abort(signal.reason);

  if (signal.aborted) {
    abort();
  } else {
    signal.addEventListener('abort', abort, { once: true });
  }

  return {
    controller,
    dispose: () => signal.removeEventListener('abort', abort),
  };
};

const createInterruptedResult = <TPresentation>(reason: unknown): RouterRuntimePrepareResult<TPresentation> => ({
  reason,
  type: 'interrupted',
});

class ActionPolicyDecisionError extends Error {
  constructor(readonly decision: Extract<PolicyBoundaryDecision, { readonly type: 'forbidden' | 'not-found' }>) {
    super(`Controller action отклонён policy-решением ${decision.type}.`);
  }
}

const throwIfAborted = (signal: AbortSignal): void => {
  if (signal.aborted) {
    throw signal.reason ?? new Error('Router transition был прерван.');
  }
};

const assertRuntimeId = (runtimeId: string): void => {
  if (runtimeId.length === 0 || runtimeId.trim() !== runtimeId) {
    throw new Error('Router runtime id должен быть непустым значением без пробелов по краям.');
  }
};

const EMPTY_PARAMS = Object.freeze({});
const EMPTY_PROPS = Object.freeze({});
