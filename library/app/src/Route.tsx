import { controller as pushController } from '@library/push';

import React from 'react';
import { observer } from 'mobx-react';
import { RouteObject, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Spinner } from './components/Spinner';
import { Error } from './components/Error';
import { emitter } from './application.emitter.ts';
import { APPLICATION_ERROR, APPLICATION_UNAUTHORIZED } from './variables.ts';

interface IOptionsRoute {
  isPublic?: boolean;
}

export interface IPropsWithAppRoute {
  route: Route;
}

const LoadView: React.FC<IPropsWithAppRoute> = (props) => {
  const [View, setModule] = React.useState<any>(null);

  React.useEffect(() => {
    (async () => {
      const ViewModule = await Route.loadModule(props.route.content);

      setModule(ViewModule);
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

const Loader: React.FC<IPropsWithAppRoute> = (props) => {
  return <LoadView {...props} />;
};

const SecondStep: React.FC<IPropsWithAppRoute> = (props) => {
  return <Loader {...props} />;
};

const FirstStep: React.FC<IPropsWithAppRoute> = observer((props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    emitter.on<string>('application', (result) => {
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

  return <SecondStep {...props} />;
});

export class Route {
  constructor(
    private readonly path: string,
    private readonly module: any,
    private readonly options?: IOptionsRoute,
  ) {}

  static async loadModule(content: Promise<any> | Function) {
    if (content instanceof Function) {
      content = content();
    }
    const module = await content;
    return module.default;
  }

  get isPublic() {
    return this.options?.isPublic ?? false;
  }

  get content() {
    return this.module;
  }

  create(): RouteObject {
    return {
      path: this.path,
      element: <FirstStep route={this} />,
    };
  }
}
