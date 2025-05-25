import { type IClassModule } from '@library/app';

import React from 'react';

import { ProductsView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { ProductsControllerInterface } from './classes/controller/products-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: ProductsControllerInterface;

  constructor() {
    const container = create();

    this.controller = container.get<ProductsControllerInterface>(ProductsControllerInterface);
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
        <ProductsView />
      </ModuleProvider>
    );
  }
}
