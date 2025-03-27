import { ApplicationModule } from '@library/app';

import React from 'react';

import { Property } from './components/Property';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyController, PropertyControllerSymbol } from './classes/controller/property.controller.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<PropertyController>(PropertyControllerSymbol);

  destroy() {
    destroy();
  }

  async loader() {
    await this.controller.findAll();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Property />
      </ModuleProvider>
    );
  }
}
