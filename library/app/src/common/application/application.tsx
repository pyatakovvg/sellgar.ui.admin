import { logger } from '@library/domain';

import React from 'react';

import { Container } from '../container';
import { contextProvider } from '../context';

import { ApplicationContext } from './application.context.tsx';
import { ApplicationInterface, type IOptions } from './application.interface.tsx';

import { containerModule } from './classes/classes.di.ts';

export class Application implements ApplicationInterface {
  public readonly container = new Container();

  constructor(private readonly options: IOptions) {
    this.container.bind(containerModule);

    contextProvider.bind(
      ApplicationContext,
      new ApplicationContext(
        {
          ...this.options,
          components: {
            ...this.options.components,
          },
        },
        this.container,
      ),
    );
  }

  createView(): React.FC {
    const RouterView = this.options.router.render();

    return () => {
      if (this.options.layout) {
        return this.options.layout(<RouterView />);
      }
      return <RouterView />;
    };
  }
}
