import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { useProfile } from './hook/useProfile.ts';

import { Error } from './components/Error';
import { Spinner } from './components/Spinner';
import { Forbidden } from './components/Forbidden';

export interface IPropsWithAppRoute {
  route: Route;
}

interface IBreadcrumb {
  label: string;
}

interface IRouteOptions {
  roles?: string[];
  permissions?: string[];
  breadcrumb?: IBreadcrumb;
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
      setTimeout(() => setModule(ViewModule), 400);
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

const CheckCredentials: React.FC<IPropsWithAppRoute> = (props) => {
  const profile = useProfile();

  const hasRoles = profile.checkRoles(props.route.roles);
  const hasPermissions = profile.checkPermissions(props.route.permissions);

  if (!hasRoles || !hasPermissions) {
    return <Forbidden />;
  }

  return <LoadView {...props} />;
};

export class Route<T = any> {
  constructor(
    private readonly path: string,
    private readonly module: () => Promise<{ default: T }>,
    private readonly options?: IRouteOptions,
  ) {}

  static normalizePath(path: string): string {
    if (path === '/') {
      return '';
    }
    return path.replace(/^\//gi, '');
  }

  get roles() {
    return this.options?.roles ?? [];
  }

  get permissions() {
    return this.options?.permissions ?? [];
  }

  get content() {
    return this.module;
  }

  create(): RouteObject | null {
    return {
      handle: {
        crumb: (title?: string) =>
          title ?? this.options?.breadcrumb
            ? {
                label: title ?? this.options?.breadcrumb?.label,
                href: this.path,
              }
            : null,
      },
      path: Route.normalizePath(this.path),
      element: <CheckCredentials route={this} />,
    };
  }
}
