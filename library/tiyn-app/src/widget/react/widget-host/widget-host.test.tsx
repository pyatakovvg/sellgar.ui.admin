import 'reflect-metadata';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';

import { Controller } from '../../../controller/contract/controller';

import { BindingModuleInterface } from '../../../di/binding/binding-module';
import { UseBindings } from '../../../di/composition/use-bindings';
import type { BindingRegistryInterface } from '../../../di/binding/binding-registry';
import { ApplicationScope } from '../../../runtime/scope/kind';
import { RuntimeScopeProvider } from '../../../runtime/react';

import { Widget, WidgetDefinition } from '../../declaration/widget';
import { WidgetControllerInterface } from '../../runtime/widget-controller';
import { WidgetRuntimeFactoryBindings, WidgetRuntimeFactoryInterface } from '../../runtime/widget-runtime-factory';
import type { WidgetControllerLoaderArgs } from '../../runtime/widget-controller';
import { useLoaderData } from '../../../controller/react/use-controller-loader-data';
import { useWidgetProps } from '../use-widget-props';

import { WidgetHost } from './';

describe('WidgetHost', () => {
  it('keeps widget props typed from token', () => {
    expect(createTypedWidgetHostFixture()).toBeDefined();
  });

  it('renders widget token and forwards props', async () => {
    const scope = new ApplicationScope();

    scope.activate(TestApplicationOwner);

    render(
      <RuntimeScopeProvider scope={scope}>
        <WidgetHost token={TestWidget} props={{ value: 'loaded' }} />
      </RuntimeScopeProvider>,
    );

    expect(screen.getByText('Loading widget')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Widget loaded: loaded')).toBeInTheDocument();
    });
  });

  it('keeps the runtime alive during React StrictMode effect replay', async () => {
    const scope = new ApplicationScope();

    scope.activate(TestApplicationOwner);

    render(
      <React.StrictMode>
        <RuntimeScopeProvider scope={scope}>
          <WidgetHost token={TestWidget} props={{ value: 'strict' }} />
        </RuntimeScopeProvider>
      </React.StrictMode>,
    );

    await waitFor(() => {
      expect(screen.getByText('Widget strict: strict')).toBeInTheDocument();
    });
  });

  it('uses prepared widget runtime without owning its disposal', async () => {
    const scope = new ApplicationScope();

    scope.activate(TestApplicationOwner);

    const widgetRuntimeFactory = scope.get(WidgetRuntimeFactoryInterface);
    const preparedRuntime = widgetRuntimeFactory.prepare(TestWidget, {
      ownerScope: scope,
      props: {
        value: 'prepared',
      },
    });

    await preparedRuntime.load();

    const { unmount } = render(
      <RuntimeScopeProvider scope={scope}>
        <WidgetHost token={TestWidget} props={{ value: 'prepared' }} />
      </RuntimeScopeProvider>,
    );

    expect(screen.getByText('Widget prepared: prepared')).toBeInTheDocument();

    unmount();

    await waitFor(() => {
      expect(preparedRuntime.getSnapshot().phase).toBe('ready');
    });

    const releasedRuntime = widgetRuntimeFactory.releasePrepared(TestWidget, {
      ownerScope: scope,
    });

    expect(releasedRuntime).toBe(preparedRuntime);

    await preparedRuntime.dispose();

    expect(preparedRuntime.getSnapshot().phase).toBe('disposed');
  });
});

const createTypedWidgetHostFixture = (): React.ReactElement => {
  const valid = <WidgetHost token={TestWidget} props={{ value: 'typed' }} />;
  // @ts-expect-error WidgetHost props are inferred from widget token.
  const invalid = <WidgetHost token={TestWidget} props={{ missing: 'typed' }} />;

  void invalid;

  return valid;
};

interface TestWidgetProps {
  readonly value: string;
}

@Controller()
class TestWidgetController extends WidgetControllerInterface<TestWidgetProps> {
  async loader(args: WidgetControllerLoaderArgs<TestWidgetProps>): Promise<string> {
    return args.props.value;
  }
}

const TestWidgetView: React.FC = () => {
  const props = useWidgetProps<TestWidgetProps>();
  const value = useLoaderData(TestWidgetController);

  return <div>{`Widget ${props.value}: ${value}`}</div>;
};

class TestWidgetBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    registry.bind(TestWidgetController).toSelf().inSingletonScope();
  }
}

@UseBindings(TestWidgetBindings)
@Widget({
  fallback: <div>Loading widget</div>,
  view: TestWidgetView,
})
class TestWidget extends WidgetDefinition<TestWidgetProps> {}

class TestApplicationBindings extends BindingModuleInterface {
  register(registry: BindingRegistryInterface): void {
    new WidgetRuntimeFactoryBindings().register(registry);
  }
}

@UseBindings(TestApplicationBindings)
class TestApplicationOwner {}
