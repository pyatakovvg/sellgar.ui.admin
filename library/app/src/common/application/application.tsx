import React from 'react';

import { Container } from '../container';
import { contextProvider } from '../context';

import { Splash } from './component/splash';
import { NotFound } from './component/not-found';
import { Exception } from './component/exception';

import { ApplicationContext } from './application.context.tsx';
import { ApplicationInterface, type IOptions } from './application.interface.tsx';

import { containerModule } from './classes/classes.di.ts';

export class Application implements ApplicationInterface {
  public readonly container = new Container();

  constructor(private readonly options: IOptions) {
    console.log('App: constructor - start');

    this.container.bind(containerModule);

    contextProvider.bind(
      ApplicationContext,
      new ApplicationContext(
        {
          ...this.options,
          components: {
            splash: <Splash />,
            notFound: <NotFound />,
            exception: <Exception />,
            ...this.options.components,
          },
        },
        this.container,
      ),
    );

    console.log('App: constructor - finish');
  }

  createView(): React.FC {
    console.log('App: createView');

    const RouterView = this.options.router.render();

    return () => {
      if (this.options.layout) {
        return this.options.layout(<RouterView />);
      }
      return <RouterView />;
    };
  }
}
