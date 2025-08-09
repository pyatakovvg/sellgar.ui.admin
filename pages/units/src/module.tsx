import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { UnitView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { UnitsController, UnitsControllerSymbol } from './classes/controller/units.controller.ts';

export class ClassModule implements IClassModule {
  private readonly controller: UnitsController;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get<UnitsController>(UnitsControllerSymbol);
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
        <UnitView />
      </ModuleProvider>
    );
  }
}
