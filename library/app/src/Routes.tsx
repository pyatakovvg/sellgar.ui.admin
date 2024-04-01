import { controller as pushController } from '@library/push';

import React from 'react';
import { observer } from 'mobx-react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { Route as ReactRoute, Routes, useNavigate } from 'react-router-dom';

import { Route } from './Route';
import { emmiter } from './application.emitter';
import { useApp } from './hook/useApp';
import { WithEvents } from './common/WithEvents';

import { APPLICATION_ERROR, APPLICATION_UNAUTHORIZED } from './variables';

export interface IRotesViewProps {
  Splash: React.FC;
  Loader: React.FC;
  Error: React.ComponentType<FallbackProps>;
}

export interface IPropsWithAppRoute {
  route: Route;
}

export interface IRoutes {
  createView(): React.FC<IRotesViewProps>;
}

const cache = new Map();

const LoadView: React.FC<IRotesViewProps & IPropsWithAppRoute> = (props) => {
  const [View, setModule] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const ViewModule = await Route.loadModule(props.route.content);

      if (props.route.options?.isCacheable && cache.has(props.route.path)) {
        return setModule(cache.get(props.route.path));
      }

      if (props.route.options?.isCacheable) {
        cache.set(props.route.path, ViewModule);
      }

      setModule(ViewModule);
    })();
    return () => {
      setModule(null);
    };
  }, [props.route]);

  if (!View) {
    return <props.Loader />;
  }
  return (
    <ErrorBoundary FallbackComponent={props.Error}>
      <View />
    </ErrorBoundary>
  );
};

const Loader: React.FC<IRotesViewProps & IPropsWithAppRoute> = (props) => {
  if (props.route.content instanceof Array) {
    return (
      <Routes>
        {props.route.content.map((route) => {
          return (
            <ReactRoute
              key={route.path}
              path={route.path}
              element={<SecondStep route={route} Splash={props.Splash} Loader={props.Loader} Error={props.Error} />}
            />
          );
        })}
      </Routes>
    );
  }
  return <LoadView {...props} />;
};

const SecondStep: React.FC<IRotesViewProps & IPropsWithAppRoute> = (props) => {
  if (props.route.options?.layout) {
    return (
      <props.route.options.layout>
        <Loader {...props} />
      </props.route.options.layout>
    );
  }

  return <Loader {...props} />;
};

const FirstStep: React.FC<IRotesViewProps & IPropsWithAppRoute> = observer((props) => {
  const { appController } = useApp();

  React.useEffect(() => {
    if (props.route.options?.isPublic) {
      setTimeout(() => appController.setStarted(true), 1000);
      return void 0;
    }
    (async () => {
      await appController.checkProfile();

      setTimeout(() => appController.setStarted(true), 1000);
    })();
  }, []);

  if (!appController.getStarted()) {
    return <props.Splash />;
  }

  return <SecondStep {...props} />;
});

export class ApplicationRoutes extends WithEvents implements IRoutes {
  constructor(private readonly routes: Route[] = []) {
    super();
  }

  createView(): React.FC<IRotesViewProps> {
    return observer((props) => {
      const navigate = useNavigate();

      React.useEffect(() => {
        emmiter.on<string>('application', (result) => {
          if (result) {
            switch (result.type) {
              case APPLICATION_UNAUTHORIZED:
                return navigate('/sign-in');
              case APPLICATION_ERROR: {
                return pushController.add({
                  title: 'Ошибка приложения',
                  content: result.data,
                });
              }
            }
          }
        });
      }, []);

      return (
        <Routes>
          {this.routes.map((route) => {
            return (
              <ReactRoute
                key={route.path}
                path={import.meta.env.VITE_PUBLIC_URL + route.path}
                element={<FirstStep route={route} Splash={props.Splash} Loader={props.Loader} Error={props.Error} />}
              />
            );
          })}
        </Routes>
      );
    });
  }
}
