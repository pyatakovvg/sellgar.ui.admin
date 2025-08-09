import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { UnitView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { UnitControllerInterface } from './classes/controller/unit-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: UnitControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(UnitControllerInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    if (args.params?.uuid) {
      return await this.controller.getByUuid(args.params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <UnitView />
      </ModuleProvider>
    );
  }
}
