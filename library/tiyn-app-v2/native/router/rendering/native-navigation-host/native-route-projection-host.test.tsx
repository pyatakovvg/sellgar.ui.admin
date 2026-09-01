import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import type { ApplicationRouterHistoryEntry } from '../../../../core/application/lifecycle/application';
import { segments } from '../../../../core/router/declaration/address';
import { getRouteDefinition } from '../../../../core/router/declaration/route';
import type { NavigationState } from '../../../../core/router/runtime/navigation-state';
import type { RouteActivationRuntime } from '../../../../core/router/runtime/route-runtime';
import { Layout, type LayoutViewProps } from '../../../layout/declaration/layout';
import type { ModuleMetadata } from '../../../module/declaration/module';
import { ScreenAnimation } from '../../../screen/declaration/screen-animation';
import { Route } from '../../declaration/route';
import { NativeRouteProjectionHost } from './native-route-projection-host.tsx';

vi.mock('react-native', () => ({
  StyleSheet: { create: <T,>(styles: T): T => styles },
  Text: ({ children }: { readonly children: React.ReactNode }) => <span>{children}</span>,
  View: ({
    accessibilityLabel,
    children,
  }: {
    readonly accessibilityLabel?: string;
    readonly children: React.ReactNode;
  }) => <div aria-label={accessibilityLabel}>{children}</div>,
}));

vi.mock('../../../screen/rendering/screen-renderer', () => ({
  ScreenRenderer: ({
    screens,
  }: {
    readonly screens: readonly {
      readonly animation: string | undefined;
      readonly content: React.ReactNode;
      readonly key: string;
    }[];
  }) => (
    <div data-testid="screen-renderer">
      {screens.map((screen) => (
        <section data-animation={screen.animation ?? 'none'} data-screen-id={screen.key} key={screen.key}>
          {screen.content}
        </section>
      ))}
    </div>
  ),
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
const BrandsLayoutView: React.FC<LayoutViewProps> = ({ children }) => <div data-testid="brands-layout">{children}</div>;

@Layout({ view: AuthenticatedLayoutView })
class AuthenticatedLayout {}

@Layout({ view: ProductsLayoutView })
class ProductsLayout {}

@Layout({ view: ProductLayoutView })
class ProductLayout {}

@Layout({ view: BrandsLayoutView })
class BrandsLayout {}

class ProductsRouteToken {}
class ProductRouteToken {}
class BrandsRouteToken {}

describe('NativeRouteProjectionHost', () => {
  it('creates stable nested Route.routes outlets and keeps their layouts at the owning level', () => {
    const graph = createGraph();

    render(
      <NativeRouteProjectionHost
        components={{}}
        current={undefined}
        entries={[
          createEntry('navigation:1', [graph.authenticated, graph.products]),
          createEntry('navigation:2', [graph.authenticated, graph.products, graph.product]),
          createEntry('navigation:3', [graph.authenticated, graph.brands]),
        ]}
        pending={null}
      />,
    );

    expect(screen.getAllByTestId('screen-renderer')).toHaveLength(3);
    expect(screen.getAllByTestId('authenticated-layout')).toHaveLength(1);
    expect(screen.getAllByTestId('products-layout')).toHaveLength(1);
    expect(screen.getAllByTestId('product-layout')).toHaveLength(1);
    expect(screen.getAllByTestId('brands-layout')).toHaveLength(1);

    const productScreen = screen.getByLabelText('Native screen ProductRouteToken').closest('section');
    const brandsScreen = screen.getByLabelText('Native screen BrandsRouteToken').closest('section');

    expect(productScreen).toHaveAttribute('data-animation', ScreenAnimation.SlideFromRight);
    expect(brandsScreen).toHaveAttribute('data-animation', 'none');
    expect(screen.getByTestId('authenticated-layout')).toContainElement(brandsScreen);
  });

  it('reuses the physical screen when navigation returns to an earlier Route activation', () => {
    const graph = createGraph();

    render(
      <NativeRouteProjectionHost
        components={{}}
        current={undefined}
        entries={[
          createEntry('navigation:1', [graph.authenticated, graph.products]),
          createEntry('navigation:2', [graph.authenticated, graph.brands]),
          createEntry('navigation:3', [graph.authenticated, graph.products]),
        ]}
        pending={null}
      />,
    );

    expect(screen.getAllByLabelText('Native screen ProductsRouteToken')).toHaveLength(1);
    expect(screen.getAllByLabelText('Native screen BrandsRouteToken')).toHaveLength(1);
    expect(screen.getAllByTestId('authenticated-layout')).toHaveLength(1);
  });

  it('renders diagnostic Route params without mounting the Module runtime', () => {
    const graph = createGraph({ uuid: 'native-84' });

    render(
      <NativeRouteProjectionHost
        components={{}}
        current={undefined}
        entries={[createEntry('navigation:1', [graph.authenticated, graph.products, graph.product])]}
        pending={null}
      />,
    );

    expect(screen.getByLabelText('Native screen ProductRouteToken')).toHaveTextContent('ProductRouteToken');
    expect(screen.getByLabelText('Native screen ProductRouteToken')).toHaveTextContent('{"uuid":"native-84"}');
  });

  it('creates the target screen with fallback before its runtime is committed and preserves its identity', () => {
    const graph = createGraph();
    const current = createNavigation([graph.authenticated.route, graph.products.route]);
    const pending = createNavigation([graph.authenticated.route, graph.brands.route]);
    const view = render(
      <NativeRouteProjectionHost
        components={{ fallback: <div data-testid="fallback">Preparing brands</div> }}
        current={current}
        entries={[createEntry('navigation:1', [graph.authenticated, graph.products])]}
        pending={pending}
      />,
    );

    const pendingLayout = screen.getByTestId('brands-layout');
    const pendingScreen = pendingLayout.closest('section');
    const pendingScreenId = pendingScreen?.getAttribute('data-screen-id');

    expect(pendingScreenId).toBeTruthy();
    expect(pendingLayout).toContainElement(screen.getByTestId('fallback'));
    expect(screen.queryByLabelText('Native screen BrandsRouteToken')).not.toBeInTheDocument();

    view.rerender(
      <NativeRouteProjectionHost
        components={{ fallback: <div data-testid="fallback">Preparing brands</div> }}
        current={pending}
        entries={[
          createEntry('navigation:1', [graph.authenticated, graph.products]),
          createEntry('navigation:2', [graph.authenticated, graph.brands]),
        ]}
        pending={pending}
      />,
    );

    expect(screen.getByLabelText('Native screen BrandsRouteToken').closest('section')).toHaveAttribute(
      'data-screen-id',
      pendingScreenId,
    );
    expect(screen.queryByTestId('fallback')).not.toBeInTheDocument();
  });
});

const createGraph = (productParams: Readonly<Record<string, unknown>> = {}) => {
  const productRoute = new Route({
    address: segments('product'),
    animation: ScreenAnimation.SlideFromRight,
    layouts: [ProductLayout],
    load: async () => ({}),
    token: ProductRouteToken,
  });
  const productsRoute = new Route({
    address: segments('products'),
    layouts: [ProductsLayout],
    load: async () => ({}),
    routes: [productRoute],
    token: ProductsRouteToken,
  });
  const brandsRoute = new Route({
    address: segments('brands'),
    layouts: [BrandsLayout],
    load: async () => ({}),
    token: BrandsRouteToken,
  });
  const authenticatedRoute = new Route({
    layouts: [AuthenticatedLayout],
    routes: [productsRoute, brandsRoute],
  });

  return {
    authenticated: createRouteRuntime(authenticatedRoute),
    brands: createRouteRuntime(brandsRoute),
    product: createRouteRuntime(productRoute, productParams),
    products: createRouteRuntime(productsRoute),
  };
};

const createRouteRuntime = (
  route: Route,
  params: Readonly<Record<string, unknown>> = {},
): RouteActivationRuntime<ModuleMetadata> => {
  const runtimeId = getRouteDefinition(route).token?.name ?? 'anonymous';

  return {
    getParams: () => params,
    route,
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

const createNavigation = (routes: readonly Route[]): NavigationState => ({
  boundary: null,
  initiator: null,
  pendingNestedAddress: null,
  replace: false,
  revalidation: null,
  root: {
    child: null,
    owner: null,
    path: routes.map((route) => ({ params: {}, route, token: getRouteDefinition(route).token })),
    query: {},
    router: {} as NavigationState['root']['router'],
  },
  state: undefined,
});
