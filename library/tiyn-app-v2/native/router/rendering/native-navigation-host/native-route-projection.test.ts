import { describe, expect, it } from 'vitest';

import type { ApplicationRouterHistoryEntry } from '../../../../core/application/lifecycle/application';
import { Route } from '../../../../core/router/declaration/route';
import type { NavigationState } from '../../../../core/router/runtime/navigation-state';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { groupNativeRouteHistory, resolveNativePendingRouteProjection } from './native-route-projection.ts';

describe('groupNativeRouteHistory', () => {
  it('keeps one stable parent screen while navigation goes deeper inside its Route branch', () => {
    const authenticated = createRouteRuntime('authenticated');
    const products = createRouteRuntime('products');
    const product = createRouteRuntime('product');
    const entries = [
      createEntry('navigation:1', [authenticated, products]),
      createEntry('navigation:2', [authenticated, products, product]),
    ];

    const root = groupNativeRouteHistory(entries, 0);
    const authenticatedOutlet = groupNativeRouteHistory(root[0]!.entries, 1);

    expect(root).toHaveLength(1);
    expect(root[0]!.runtime).toBe(authenticated);
    expect(authenticatedOutlet).toHaveLength(1);
    expect(authenticatedOutlet[0]!.runtime).toBe(products);
    expect(authenticatedOutlet[0]!.entries).toEqual(entries);
  });

  it('focuses an already created physical screen when history returns to its Route', () => {
    const authenticated = createRouteRuntime('authenticated');
    const products = createRouteRuntime('products');
    const brands = createRouteRuntime('brands');
    const entries = [
      createEntry('navigation:1', [authenticated, products]),
      createEntry('navigation:2', [authenticated, brands]),
      createEntry('navigation:3', [authenticated, products]),
    ];

    const groups = groupNativeRouteHistory(entries, 1);

    expect(groups.map((group) => group.runtime)).toEqual([brands, products]);
    expect([...new Set(groups.map((group) => group.id))]).toHaveLength(2);
    expect(groups[1]!.entries).toEqual([entries[0], entries[2]]);
  });

  it('keeps a physical identity for an update of the same Route runtime', () => {
    const products = createRouteRuntime('products');

    const before = groupNativeRouteHistory([createEntry('navigation:1', [products])], 0);
    const after = groupNativeRouteHistory([createEntry('navigation:1', [products])], 0);

    expect(after[0]!.id).toBe(before[0]!.id);
  });

  it('changes physical identity when replace selects another Route runtime under the same history entry', () => {
    const products = createRouteRuntime('products');
    const brands = createRouteRuntime('brands');

    const before = groupNativeRouteHistory([createEntry('navigation:1', [products])], 0);
    const after = groupNativeRouteHistory([createEntry('navigation:1', [brands])], 0);

    expect(before[0]!.id).not.toBe(after[0]!.id);
  });

  it('projects the owner Module and its child Routes into the same stable child outlet', () => {
    const authenticated = createRouteRuntime('authenticated');
    const products = createRouteRuntime('products');
    const product = createRouteRuntime('product');
    const entries = [
      createEntry('navigation:1', [authenticated, products]),
      createEntry('navigation:2', [authenticated, products, product]),
      createEntry('navigation:3', [authenticated, products]),
    ];

    const groups = groupNativeRouteHistory(entries, 2);

    expect(groups.map((group) => group.runtime)).toEqual([product, null]);
    expect(groups[1]!.entries).toEqual([entries[0], entries[2]]);
  });

  it('publishes a route change as pending screen work but ignores revalidation', () => {
    const products = new Route({ load: async () => ({}) });
    const brands = new Route({ load: async () => ({}) });
    const current = createNavigation([{ params: {}, route: products }]);
    const target = createNavigation([{ params: {}, route: brands }]);

    expect(resolveNativePendingRouteProjection(current, target)).toEqual({
      changeDepth: 0,
      path: target.root.path,
    });
    expect(
      resolveNativePendingRouteProjection(current, {
        ...target,
        revalidation: { kind: 'branch' },
      }),
    ).toBeNull();
  });

  it('keeps the current screen for equal params and prepares it again when route params change', () => {
    const product = new Route({ load: async () => ({}) });
    const current = createNavigation([{ params: { uuid: 'native-45' }, route: product }]);

    expect(
      resolveNativePendingRouteProjection(
        current,
        createNavigation([{ params: { uuid: 'native-45' }, route: product }]),
      ),
    ).toBeNull();
    expect(
      resolveNativePendingRouteProjection(
        current,
        createNavigation([{ params: { uuid: 'native-84' }, route: product }]),
      ),
    ).toMatchObject({ changeDepth: 0 });
  });
});

const createRouteRuntime = (runtimeId: string): RouteActivationRuntime<ModuleMetadata> => {
  return {
    route: new Route({ load: async () => ({}) }),
    runtimeId,
  } as unknown as RouteActivationRuntime<ModuleMetadata>;
};

const createEntry = (
  key: string,
  routes: readonly RouteActivationRuntime<ModuleMetadata>[],
): ApplicationRouterHistoryEntry<ModuleMetadata> => {
  return {
    key,
    tree: { routes },
  } as unknown as ApplicationRouterHistoryEntry<ModuleMetadata>;
};

const createNavigation = (
  path: readonly { readonly params: Readonly<Record<string, unknown>>; readonly route: Route }[],
): NavigationState => {
  return {
    boundary: null,
    initiator: null,
    pendingNestedAddress: null,
    replace: false,
    revalidation: null,
    root: {
      child: null,
      owner: null,
      path: path.map((entry) => ({ ...entry, token: undefined })),
      query: {},
      router: {} as NavigationState['root']['router'],
    },
    state: undefined,
  };
};
