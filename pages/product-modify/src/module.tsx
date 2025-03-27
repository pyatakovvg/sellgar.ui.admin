import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Product } from './components/Product';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get(ProductPresenterInterface);

  destroy() {
    destroy();
  }

  async loader({ params }: LoaderFunctionArgs) {
    await this.controller.findProperties();
    if (params.uuid) {
      return await this.controller.findByUuid(params.uuid);
    }
    return null;
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Product />
      </ModuleProvider>
    );
  }
}
