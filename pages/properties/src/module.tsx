import { type IClassModule } from '@library/app';

import React from 'react';

import { PropertyView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyControllerInterface } from './classes/controller/property-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: PropertyControllerInterface;

  constructor() {
    const container = create();

    this.controller = container.get<PropertyControllerInterface>(PropertyControllerInterface);
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
        <PropertyView />
      </ModuleProvider>
    );
  }
}
