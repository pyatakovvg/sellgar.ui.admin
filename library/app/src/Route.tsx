import { uuid } from '@utils/generate';

import React from 'react';
import { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { useProfile } from './hook/useProfile.ts';

import { Error } from './components/Error';
import { Forbidden } from './components/Forbidden';
import { ModuleLoader } from './components/ModuleLoader';

export interface IPropsWithAppRoute {
  route: Route;
}

interface IBreadcrumb {
  id?: string;
  label?: string;
}

interface IRouteOptions {
  roles?: string[];
  permissions?: string[];
  breadcrumb?: IBreadcrumb;
}

const LoadView: React.FC<IPropsWithAppRoute> = (props) => {
  const [Module, setModule] = React.useState<any | null>(null);

  React.useLayoutEffect(() => {
    return () => {
      setModule(null);
    };
  }, [props.route]);

  React.useEffect(() => {
    (async () => {
      const { Module } = await props.route.content();

      setTimeout(() => setModule(Module), 200);
    })();
  }, [props.route]);

  if (!Module) {
    return <ModuleLoader />;
  }

  return <ErrorBoundary FallbackComponent={Error}>{Module}</ErrorBoundary>;
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

export class Route {
  readonly uuid = uuid();

  constructor(
    private readonly path: string,
    private readonly module: () => Promise<{ Module: React.FC }>,
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

  get breadcrumbs() {
    return this.options?.breadcrumb ?? null;
  }

  get content() {
    return this.module;
  }

  create(): RouteObject | null {
    return {
      handle: {
        uuid: this.uuid,
        crumb: () => {
          return this.options?.breadcrumb
            ? {
                id: this.options?.breadcrumb?.id ?? undefined,
                label: this.options?.breadcrumb?.label,
                href: this.path,
              }
            : null;
        },
      },
      path: Route.normalizePath(this.path),
      element: <CheckCredentials route={this} />,
    };
  }
}
