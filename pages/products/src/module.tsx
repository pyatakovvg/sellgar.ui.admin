import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { ProductsView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { ProductsControllerInterface } from './classes/controller/products-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: ProductsControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(ProductsControllerInterface);
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
        <ProductsView />
      </ModuleProvider>
    );
  }
}
