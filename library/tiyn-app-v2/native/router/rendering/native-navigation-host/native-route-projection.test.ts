import { describe, expect, it } from 'vitest';

import type { ApplicationRouterRuntimeEntry } from '../../../../core/application/lifecycle/application';
import { Route } from '../../../../core/router/declaration/route';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ModuleMetadata } from '../../../module/declaration/module';
import type { RouterRuntimeBranchSnapshot } from '../../../../core/router/runtime/router-runtime';
import { createNativeRouteProjection, resolveNativePendingRouteProjection } from './native-route-projection.ts';

describe('createNativeRouteProjection', () => {
  it('projects retained activations as one recursive route tree', () => {
    const authenticated = createRouteRuntime();
    const products = createRouteRuntime();
    const product = createRouteRuntime();
    const brands = createRouteRuntime();
    const projection = createNativeRouteProjection([
      createEntry('products', [authenticated, products]),
      createEntry('product', [authenticated, products, product]),
      createEntry('brands', [authenticated, brands]),
    ]);

    expect(projection).toHaveLength(1);
    expect(projection[0]).toMatchObject({
      entryKeys: ['products', 'product', 'brands'],
      runtime: authenticated,
      terminalEntryKeys: [],
    });
    expect(projection[0]!.children).toHaveLength(2);
    expect(projection[0]!.children[0]).toMatchObject({
      entryKeys: ['products', 'product'],
      runtime: products,
      terminalEntryKeys: ['products'],
    });
    expect(projection[0]!.children[0]!.children[0]).toMatchObject({
      entryKeys: ['product'],
      runtime: product,
      terminalEntryKeys: ['product'],
    });
    expect(projection[0]!.children[1]).toMatchObject({
      entryKeys: ['brands'],
      runtime: brands,
      terminalEntryKeys: ['brands'],
    });
  });

  it('shares a Route with load and children instead of treating load as a layout boundary', () => {
    const childRoute = new Route({ load: async () => ({}) });
    const parent = createRouteRuntime(new Route({ load: async () => ({}), routes: [childRoute] }));
    const child = createRouteRuntime(childRoute);
    const projection = createNativeRouteProjection([
      createEntry('parent', [parent]),
      createEntry('child', [parent, child]),
    ]);

    expect(projection).toHaveLength(1);
    expect(projection[0]).toMatchObject({
      entryKeys: ['parent', 'child'],
      runtime: parent,
      terminalEntryKeys: ['parent'],
    });
    expect(projection[0]!.children).toHaveLength(1);
    expect(projection[0]!.children[0]).toMatchObject({
      entryKeys: ['child'],
      runtime: child,
      terminalEntryKeys: ['child'],
    });
  });

  it('keeps parameterized runtimes as separate retained presentations', () => {
    const branch = createRouteRuntime();
    const productOne = createRouteRuntime();
    const productTwo = createRouteRuntime();
    const projection = createNativeRouteProjection([
      createEntry('product-1', [branch, productOne]),
      createEntry('product-2', [branch, productTwo]),
    ]);

    expect(projection[0]!.children.map((node) => node.runtime)).toEqual([productOne, productTwo]);
  });

  it('does not project nested Router preparation as a screen fallback', () => {
    const branch = {
      childPending: true,
      pending: true,
      pendingLocalChange: null,
      routes: [createRouteRuntime()],
    } as unknown as RouterRuntimeBranchSnapshot<ModuleMetadata>;

    expect(resolveNativePendingRouteProjection(branch)).toBeNull();
  });

  it('projects a local Route change at its unchanged ancestry outlet', () => {
    const routes = [createRouteRuntime(), createRouteRuntime()];
    const branch = {
      childPending: false,
      pending: true,
      pendingLocalChange: { commonRouteCount: 1 },
      routes,
    } as unknown as RouterRuntimeBranchSnapshot<ModuleMetadata>;

    expect(resolveNativePendingRouteProjection(branch)).toEqual({ commonRouteCount: 1, routes });
  });
});

const createRouteRuntime = (
  route: Route = new Route({ load: async () => ({}) }),
): RouteActivationRuntime<ModuleMetadata> => {
  return {
    route,
  } as unknown as RouteActivationRuntime<ModuleMetadata>;
};

const createEntry = (
  key: string,
  routes: readonly RouteActivationRuntime<ModuleMetadata>[],
): ApplicationRouterRuntimeEntry<ModuleMetadata> => {
  return {
    key,
    tree: { routes },
  } as unknown as ApplicationRouterRuntimeEntry<ModuleMetadata>;
};
