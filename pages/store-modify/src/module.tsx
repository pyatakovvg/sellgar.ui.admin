import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { ModifyView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { ProductPresenterInterface } from './classes/presenter/product-presenter.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: ProductPresenterInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(ProductPresenterInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    await this.controller.getProductVariants();

    if (args.params?.uuid) {
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
