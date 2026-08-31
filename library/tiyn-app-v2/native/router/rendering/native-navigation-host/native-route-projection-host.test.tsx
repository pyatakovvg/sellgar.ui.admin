import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { ApplicationRouterRuntimeEntry } from '../../../../core/application/lifecycle/application';
import { segments } from '../../../../core/router/declaration/address';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import { ApplicationScope } from '../../../../core/runtime/scope/kind/application-scope';
import { Layout, type LayoutViewProps } from '../../../layout/declaration/layout';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { Route, RouteAnimation } from '../../declaration/route';
import { NativeRouteProjectionHost } from './native-route-projection-host.tsx';

vi.mock('react-native', () => ({
  StyleSheet: {
    absoluteFill: {},
    create: <T,>(styles: T): T => styles,
  },
  View: ({ children }: { readonly children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../screen-transition', () => ({
  ScreenTransition: ({
    animation,
    children,
  }: {
    readonly animation: string | undefined;
    readonly children: React.ReactNode;
  }) => <div data-animation={animation ?? 'none'}>{children}</div>,
}));

const AuthenticatedLayoutView: React.FC<LayoutViewProps> = ({ children }) => (
  <div data-testid="authenticated-layout">{children}</div>
);
const ProductsLayoutView: React.FC<LayoutViewProps> = ({ children }) => (
  <div data-testid="products-layout">{children}</div>
);
const ProductLayoutView: React.FC<LayoutViewProps> = ({ children }) => (
  <div data-testid="product-layout">{children}</div>
);

@Layout({ view: AuthenticatedLayoutView })
class AuthenticatedLayout {}

@Layout({ view: ProductsLayoutView })
class ProductsLayout {}

@Layout({ view: ProductLayoutView })
class ProductLayout {}

describe('NativeRouteProjectionHost', () => {
  it('renders layouts once at their route level and keeps animation on the exact route', () => {
    const productRoute = new Route({
      address: segments('product'),
      animation: RouteAnimation.SlideFromRight,
      layouts: [ProductLayout],
      load: async () => ({}),
    });
    const productsRoute = new Route({
      address: segments('products'),
      layouts: [ProductsLayout],
      load: async () => ({}),
      routes: [productRoute],
    });
    const brandsRoute = new Route({ address: segments('brands'), load: async () => ({}) });
    const authenticatedRoute = new Route({
      layouts: [AuthenticatedLayout],
      routes: [productsRoute, brandsRoute],
    });
    const authenticated = createRouteRuntime(authenticatedRoute);
    const products = createRouteRuntime(productsRoute);
    const product = createRouteRuntime(productRoute);
    const brands = createRouteRuntime(brandsRoute, 'retained');

    render(
      <NativeRouteProjectionHost
        backInProgress={false}
        components={{ fallback: <div>fallback</div> }}
        entries={[
          createEntry('products', 'retained', [authenticated, products]),
          createEntry('product', 'focused', [authenticated, products, product]),
          createEntry('brands', 'retained', [authenticated, brands]),
        ]}
        forward
        pending={null}
      />,
    );

    expect(screen.getAllByTestId('authenticated-layout')).toHaveLength(1);
    expect(screen.getAllByTestId('products-layout')).toHaveLength(1);
    expect(screen.getAllByTestId('product-layout')).toHaveLength(1);
    expect(screen.getByTestId('authenticated-layout').parentElement).toHaveAttribute('data-animation', 'none');
    expect(screen.getByTestId('products-layout').parentElement).toHaveAttribute('data-animation', 'none');
    expect(screen.getByTestId('product-layout').parentElement).toHaveAttribute(
      'data-animation',
      RouteAnimation.SlideFromRight,
    );
  });

  it('places a screen fallback after the unchanged nested layout prefix', () => {
    const childRoute = new Route({ address: segments('child'), load: async () => ({}) });
    const parentRoute = new Route({ layouts: [ProductsLayout], routes: [childRoute] });
    const parent = createRouteRuntime(parentRoute);
    const child = createRouteRuntime(childRoute);

    render(
      <NativeRouteProjectionHost
        backInProgress={false}
        components={{ fallback: <div data-testid="fallback">fallback</div> }}
        entries={[createEntry('child', 'focused', [parent, child])]}
        forward
        pending={{ commonRouteCount: 1, routes: [parent, child] }}
      />,
    );

    expect(screen.getByTestId('products-layout')).toContainElement(screen.getByTestId('fallback'));
  });
});

const createRouteRuntime = (
  route: Route,
  phase: 'active' | 'retained' = 'active',
): RouteActivationRuntime<ModuleMetadata> => {
  const scope = new ApplicationScope();
  const snapshot = Object.freeze({ error: null, phase });

  return {
    failRender: vi.fn(async () => undefined),
    getModuleRuntimeOrNull: () => null,
    getRouteScope: () => scope,
    getSnapshot: () => snapshot,
    route,
    subscribe: () => () => undefined,
  } as unknown as RouteActivationRuntime<ModuleMetadata>;
};

const createEntry = (
  key: string,
  phase: 'focused' | 'retained',
  routes: readonly RouteActivationRuntime<ModuleMetadata>[],
): ApplicationRouterRuntimeEntry<ModuleMetadata> => {
  return {
    key,
    phase,
    tree: { routes },
  } as unknown as ApplicationRouterRuntimeEntry<ModuleMetadata>;
};
