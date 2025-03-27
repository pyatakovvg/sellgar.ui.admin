import { ApplicationModule } from '@library/app';

import React from 'react';

import { Products } from './components/Products';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { ProductsController, ProductsControllerSymbol } from './classes/controller/products.controller.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<ProductsController>(ProductsControllerSymbol);

  destroy() {
    destroy();
  }

  async loader() {
    await this.controller.findAll();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Products />
      </ModuleProvider>
    );
  }
}
