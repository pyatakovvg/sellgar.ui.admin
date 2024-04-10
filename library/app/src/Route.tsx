import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Error } from './components/Error';
import { Spinner } from './components/Spinner';

export interface IPropsWithAppRoute {
  route: Route;
}

async function loadModule<T>(content: () => Promise<{ default: T }>) {
  const module = await content();
  return module.default;
}

const LoadView: React.FC<IPropsWithAppRoute> = (props) => {
  const [View, setModule] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const ViewModule = await loadModule<typeof props.route.content>(props.route.content);

      setTimeout(() => setModule(ViewModule), 1000);
    })();
    return () => {
      setModule(null);
    };
  }, [props.route]);

  if (!View) {
    return <Spinner />;
  }
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <View />
    </ErrorBoundary>
  );
};

export class Route<T = any> {
  constructor(
    private readonly path: string,
    private readonly module: () => Promise<{ default: T }>,
  ) {}

  get content() {
    return this.module;
  }

  create(): RouteObject {
    return {
      path: this.path,
      element: <LoadView route={this} />,
    };
  }
}
