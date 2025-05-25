import { type IClassModule } from '@library/app';

import React from 'react';

import { SignInView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { SignInPresenterInterface } from './classes/presenter/sign-in-presenter.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: SignInPresenterInterface;

  constructor() {
    const container = create();

    this.controller = container.get(SignInPresenterInterface);
  }

  destructor() {
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
