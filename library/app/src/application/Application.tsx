import React from 'react';
import { configure } from 'mobx';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Route } from '../Route';
import { ApplicationRoutes } from '../Routes';
import { WithEvents } from '../common/WithEvents';
import { ApplicationController } from './application.controller';

import type { IRoutes } from '../Routes';
import type { FallbackProps } from 'react-error-boundary';

import 'reflect-metadata';

configure({
  enforceActions: 'never',
});

export interface IApplicationParams {
  layout?: any;
  routes: Route[];
}

export interface IApplicationViewProps {
  Splash: React.FC;
  Loader: React.FC;
  Error: React.ComponentType<FallbackProps>;
}

export interface IApplication {
  createView(): React.FC<IApplicationViewProps>;
}

export interface IApplicationContext {
  appController: ApplicationController;
}

interface IWithLayoutStep {
  layout: any;
}

export const context = React.createContext<IApplicationContext>({} as IApplicationContext);
const Provider = context.Provider;

const WithLayout: React.FC<React.PropsWithChildren<IWithLayoutStep>> = (props) => {
  if (props.layout) {
    return <props.layout>{props.children}</props.layout>;
  }
  return props.children;
};

export class Application extends WithEvents implements IApplication {
  private readonly _routes: IRoutes;
  private readonly _controller: ApplicationController = new ApplicationController();

  constructor(readonly params: IApplicationParams) {
    super();

    this._routes = new ApplicationRoutes(params.routes);
  }

  createView(): React.FC<IApplicationViewProps> {
    const Routes = this._routes.createView();

    return (props) => {
      return (
        <ErrorBoundary FallbackComponent={props.Error}>
          <Provider
            value={{
              appController: this._controller,
            }}
          >
            <BrowserRouter>
              <WithLayout layout={this.params.layout}>
                <Routes Splash={props.Splash} Loader={props.Loader} Error={props.Error} />
              </WithLayout>
            </BrowserRouter>
          </Provider>
        </ErrorBoundary>
      );
    };
  }
}
