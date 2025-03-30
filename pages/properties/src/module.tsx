import { ApplicationModule } from '@library/app';

import React from 'react';

import { PropertyView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyControllerInterface } from './classes/controller/property-controller.interface.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<PropertyControllerInterface>(PropertyControllerInterface);

  destroy() {
    destroy();
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
