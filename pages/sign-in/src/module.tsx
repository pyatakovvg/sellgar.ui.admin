import { type IClassModule } from '@library/app';

import React from 'react';

import { SignInView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { SignInPresenterInterface } from './classes/presenter/sign-in-presenter.interface.ts';
import { container } from '@library/domain';

export class ClassModule implements IClassModule {
  private readonly controller: SignInPresenterInterface;

  constructor() {
    container.loadSync(containerModule);

    this.controller = container.get(SignInPresenterInterface);
  }

  destructor() {
    container.unloadSync(containerModule);
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <SignInView />
      </ModuleProvider>
    );
  }
}
