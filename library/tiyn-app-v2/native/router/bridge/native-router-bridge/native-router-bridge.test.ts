import { describe, expect, it, vi } from 'vitest';

import { param, segments } from '../../../../core/router/declaration/address';
import { Route } from '../../../../core/router/declaration/route';
import { Router } from '../../../../core/router/declaration/router';
import { matchesNavigationState } from '../../../../core/router/runtime/navigation-state';
import { resolveCoreNavigation } from '../../../../core/router/service/navigate-service';
import { createNativeRouterBridge } from './native-router-bridge';

abstract class ProductsRoute {}

abstract class ProductRoute {
  abstract readonly productId: string;
}

const router = new Router({
  routes: [
    new Route({
      address: segments('products'),
      routes: [new Route({ address: segments(param('productId')), load: async () => ({}), token: ProductRoute })],
      token: ProductsRoute,
    }),
  ],
});

describe('NativeRouterBridge', () => {
  it('selects retained ModuleRuntime lifecycle', () => {
    expect(createNativeRouterBridge().runtimeRetention).toBe('retain');
  });

  it('keeps query changes inside the current screen runtime', () => {
    const initial = resolveCoreNavigation(router, ProductsRoute, { query: { search: 'dress' } }, undefined);
    const filtered = resolveCoreNavigation(router, ProductsRoute, { query: { search: 'skirt' } }, initial);

    expect(matchesNavigationState(filtered, initial)).toBe(true);
    expect(matchesNavigationState(initial, filtered)).toBe(true);
  });

  it('creates different stack entries for different Route params', () => {
    const first = resolveCoreNavigation(router, ProductRoute, { params: { productId: 'first' } }, undefined);
    const second = resolveCoreNavigation(router, ProductRoute, { params: { productId: 'second' } }, first);

    expect(matchesNavigationState(second, first)).toBe(false);
    expect(matchesNavigationState(first, second)).toBe(false);
  });

  it('projects replace commits into the physical navigation driver', async () => {
    const navigation = resolveCoreNavigation(router, ProductsRoute, { replace: true }, undefined);
    const commit = vi.fn();
    const bridge = createNativeRouterBridge();

    const history = { action: 'replace' as const, id: 'navigation:1', index: 0, length: 1 };

    bridge.registerDriver({ commit, rootBack: () => undefined });
    await bridge.commit(navigation, { history, signal: new AbortController().signal, source: 'internal' });

    expect(commit).toHaveBeenCalledWith(navigation, history);
  });
});
