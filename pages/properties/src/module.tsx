import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { PropertyView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { PropertyControllerInterface } from './classes/controller/property-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: PropertyControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get<PropertyControllerInterface>(PropertyControllerInterface);
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
        <PropertyView />
      </ModuleProvider>
    );
  }
}
