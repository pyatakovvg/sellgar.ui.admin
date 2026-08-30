import React from 'react';

import type { ApplicationNavigationDecision } from '../../../../core/application/lifecycle/application';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type {
  ActiveChildRouterRuntime,
  RouterRuntime,
  RouterRuntimeActivationTree,
} from '../../../../core/router/runtime/router-runtime';
import type {
  ApplicationComponents,
  ResolvedApplicationRouting,
} from '../../../application/config/application-configurator';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { getRoutePresentationDefinition } from '../../declaration/route';
import { getRouterPresentationDefinition } from '../../declaration/router';
import { NestedRouterHost } from '../router-host/nested-router-host';
import { RouterHost } from '../router-host';

interface IProps {
  readonly components: ApplicationComponents;
  readonly decision?: ApplicationNavigationDecision | null;
  readonly routing: ResolvedApplicationRouting | null;
  readonly runtime: RouterRuntime<ModuleMetadata>;
  readonly tree?: RouterRuntimeActivationTree<ModuleMetadata>;
}

export const NestedRouterLayer: React.FC<IProps> = (props) => {
  const snapshot = React.useSyncExternalStore(
    React.useCallback((listener) => props.runtime.subscribe(listener), [props.runtime]),
    React.useCallback(() => props.runtime.getSnapshot(), [props.runtime]),
    React.useCallback(() => props.runtime.getSnapshot(), [props.runtime]),
  );
  const resolvedSnapshot = props.tree?.snapshot ?? snapshot;

  if (
    props.decision?.type === 'forbidden' ||
    props.decision?.type === 'not-found' ||
    resolvedSnapshot.phase === 'forbidden' ||
    resolvedSnapshot.phase === 'not-found' ||
    resolvedSnapshot.phase === 'failed'
  ) {
    return null;
  }

  const branch = props.tree
    ? { child: props.tree.child, routes: props.tree.routes }
    : props.runtime.getBranchSnapshot();
  const activeChild = branch.child;

  if (!activeChild) {
    return null;
  }

  const components = resolveNestedComponents(props, branch.routes, activeChild.owner);

  if (!components) {
    return null;
  }

  return (
    <NestedRouterHost
      exception={components.exception}
      routing={props.routing}
      runtime={'tree' in activeChild ? activeChild.tree.runtime : activeChild.runtime}
    >
      <RouterHost
        components={components}
        pending={'childPending' in branch ? branch.childPending : false}
        presentation="frame"
        runtime={'tree' in activeChild ? activeChild.tree.runtime : activeChild.runtime}
        tree={'tree' in activeChild ? activeChild.tree : undefined}
      />
      {'childPending' in branch && branch.childPending ? null : (
        <NestedRouterLayer
          components={components}
          routing={props.routing}
          runtime={'tree' in activeChild ? activeChild.tree.runtime : activeChild.runtime}
          tree={'tree' in activeChild ? activeChild.tree : undefined}
        />
      )}
    </NestedRouterHost>
  );
};

const resolveNestedComponents = (
  props: IProps,
  routes: readonly RouteActivationRuntime<ModuleMetadata>[],
  owner: RouteActivationRuntime<ModuleMetadata>,
): ApplicationComponents | null => {
  const parent = resolveOwnerComponents(props.runtime, props.components, routes, owner);

  if (!parent) {
    return null;
  }

  return {
    exception: props.routing?.exception ?? parent.exception,
    fallback: props.routing?.fallback ?? parent.fallback,
    forbidden: props.routing?.forbidden ?? parent.forbidden,
    notFound: props.routing?.notFound ?? parent.notFound,
  };
};

const resolveOwnerComponents = (
  runtime: RouterRuntime<ModuleMetadata>,
  inherited: ApplicationComponents,
  routes: readonly RouteActivationRuntime<ModuleMetadata>[],
  owner: RouteActivationRuntime<ModuleMetadata>,
): ApplicationComponents | null => {
  const router = getRouterPresentationDefinition(runtime.router);
  let components: ApplicationComponents = {
    exception: router.exception ?? inherited.exception,
    fallback: router.fallback ?? inherited.fallback,
    forbidden: router.forbidden ?? inherited.forbidden,
    notFound: router.notFound ?? inherited.notFound,
  };
  if (!routes.includes(owner)) {
    throw new Error('Owner nested Router отсутствует в RouteRuntime path текущей ветки.');
  }

  for (const route of routes) {
    const definition = getRoutePresentationDefinition(route.route);

    components = {
      exception: definition.exception ?? components.exception,
      fallback: definition.fallback ?? components.fallback,
      forbidden: definition.forbidden ?? components.forbidden,
      notFound: definition.notFound ?? components.notFound,
    };

    if (route === owner) {
      return components;
    }
  }

  return null;
};
