import { type IClassModule, type IClassModuleArgs } from '@library/app';

import React from 'react';

import { BrandView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { BrandsControllerInterface } from './classes/controller/brand-controller.interface.ts';

import { containerModule } from './classes/classes.di.ts';

export class ClassModule implements IClassModule {
  private readonly controller: BrandsControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(BrandsControllerInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader() {
    return await this.controller.findAll();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <BrandView />
      </ModuleProvider>
    );
  }
}
