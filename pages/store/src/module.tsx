import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { StoreView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: StoreControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get<StoreControllerInterface>(StoreControllerInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
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
