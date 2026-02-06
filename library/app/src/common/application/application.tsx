import React from 'react';

import { Container } from '../container';
import { contextProvider } from '../context';

import { ApplicationContext } from './application.context.tsx';
import { ApplicationInterface, type IOptions, GuardInterface } from './application.interface.tsx';
import { GuardRunner } from './guards/guard-runner.ts';

import { containerModule } from './classes/classes.di.ts';

export class Application implements ApplicationInterface {
  private readonly guards: GuardInterface[] = [];
  private readonly container = new Container();

  constructor(private readonly options: IOptions) {
    this.container.bind(containerModule);

    this.options.containers?.map((containerModule) => {
      this.container.bind(containerModule);
    });

    contextProvider.bind(
      ApplicationContext,
      new ApplicationContext(
        {
          ...this.options,
          components: {
            ...this.options.components,
          },
        },
        this.guards,
        new GuardRunner(),
        this.container,
      ),
    );
  }

  guard(Guard: new (...args: any[]) => GuardInterface) {
    this.container.getContainer().bind(Guard).toSelf();

    this.guards.push(this.container.getContainer().get(Guard));
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
