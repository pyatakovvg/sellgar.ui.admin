import { ApplicationModule } from '@library/app';

import React from 'react';

import { SignInView } from './components';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { SignInPresenterInterface } from './classes/presenter/sign-in-presenter.interface.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get(SignInPresenterInterface);

  destroy() {
    destroy();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <SignInView />
      </ModuleProvider>
    );
  }
}
