import { type IClassModule } from '@library/app';

import React from 'react';

import { UnitView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { UnitsController, UnitsControllerSymbol } from './classes/controller/units.controller.ts';

export class ClassModule implements IClassModule {
  private readonly controller: UnitsController;

  constructor() {
    const container = create();

    this.controller = container.get<UnitsController>(UnitsControllerSymbol);
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
        <UnitView />
      </ModuleProvider>
    );
  }
}
