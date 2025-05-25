import { type IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Product } from './components/Product';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: ProductPresenterInterface;

  constructor() {
    const container = create();

    this.controller = container.get(ProductPresenterInterface);
  }

  destructor() {
    destroy();
  }

  async loader(args: LoaderFunctionArgs) {
    console.log(args.params);
    if (args.params.uuid) {
      return await this.controller.findByUuid(args.params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Product />
      </ModuleProvider>
    );
  }
}
