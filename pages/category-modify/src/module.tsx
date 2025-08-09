import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { CategoryView } from './view';

import { ModuleProvider } from './module.provider.tsx';
import { containerModule } from './classes/classes.di.ts';
import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: CategoryControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(CategoryControllerInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    await this.controller.findAll();

    if (args.params?.uuid) {
      return await this.controller.findByUuid(args.params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <CategoryView />
      </ModuleProvider>
    );
  }
}
