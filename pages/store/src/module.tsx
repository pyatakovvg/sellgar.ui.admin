import { type IClassModule } from '@library/app';

import React from 'react';
import { Container } from 'inversify';

import { StoreView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create } from './classes/classes.di.ts';
import { StoreControllerInterface } from './classes/controller/store-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly containerModule = create();
  private readonly controller: StoreControllerInterface;

  constructor(private readonly container: Container) {
    this.container.loadSync(this.containerModule);

    this.controller = container.get<StoreControllerInterface>(StoreControllerInterface);
  }

  destructor() {
    this.container.unloadSync(this.containerModule);
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
