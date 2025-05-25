import { type IClassModule } from '@library/app';

import React from 'react';
import { Container } from 'inversify';
import { LoaderFunctionArgs } from 'react-router-dom';

import { ModifyView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create } from './classes/classes.di.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

export class ClassModule implements IClassModule {
  private readonly containerModule = create();
  private readonly controller: ProductPresenterInterface;

  constructor(private readonly container: Container) {
    this.container.loadSync(this.containerModule);

    this.controller = container.get(ProductPresenterInterface);
  }

  destructor() {
    this.container.unloadSync(this.containerModule);
  }

  async loader(args: LoaderFunctionArgs) {
    await this.controller.getProductVariants();

    if (args.params.uuid) {
      await this.controller.getPriceHistory(args.params.uuid);
      return await this.controller.findByUuid(args.params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <ModifyView />
      </ModuleProvider>
    );
  }
}
