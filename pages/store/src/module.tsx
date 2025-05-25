import { type IClassModule } from '@library/app';

import React from 'react';

import { StoreView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: StoreControllerInterface;

  constructor() {
    const container = create();

    this.controller = container.get<StoreControllerInterface>(StoreControllerInterface);
  }

  destructor() {
    destroy();
  }

  async loader() {
    await this.controller.findAll();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <StoreView />
      </ModuleProvider>
    );
  }
}
