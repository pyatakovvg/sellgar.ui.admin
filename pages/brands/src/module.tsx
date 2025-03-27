import { ApplicationModule } from '@library/app';

import React from 'react';

import { BrandView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { BrandsController, BrandsControllerSymbol } from './classes/controller/brands.controller.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<BrandsController>(BrandsControllerSymbol);

  destroy() {
    destroy();
  }

  loader = async () => {
    await this.controller.findAll();
  };

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <BrandView />
      </ModuleProvider>
    );
  }
}
