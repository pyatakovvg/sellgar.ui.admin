import { ApplicationModule } from '@library/app';

import React from 'react';

import { UnitView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { UnitsController, UnitsControllerSymbol } from './classes/controller/units.controller.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<UnitsController>(UnitsControllerSymbol);

  destroy() {
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
