import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { ModuleView } from './view/module.view.tsx';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { ProductControllerInterface } from './classes/controller/product-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: ProductControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(ProductControllerInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    return await this.controller.findByUuid(args.params.uuid);
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <ModuleView />
      </ModuleProvider>
    );
  }
}
