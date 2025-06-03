import { type IClassModule } from '@library/app';

import React from 'react';
import { Container } from 'inversify';

import { ProductsView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create } from './classes/classes.di.ts';
import { ProductsControllerInterface } from './classes/controller/products-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly containerModule = create();
  private readonly controller: ProductsControllerInterface;

  constructor(private readonly container: Container) {
    this.container.loadSync(this.containerModule);

    this.controller = container.get(ProductsControllerInterface);
  }

  destructor() {
    console.log(234);
    this.container.unloadSync(this.containerModule);
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
