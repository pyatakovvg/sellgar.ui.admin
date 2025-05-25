import { type IClassModule } from '@library/app';

import React from 'react';

import { BrandView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { BrandsControllerInterface } from './classes/controller/brand-controller.interface.ts';

import { create, destroy } from './classes/classes.di.ts';

export class ClassModule implements IClassModule {
  private readonly controller: BrandsControllerInterface;

  constructor() {
    const container = create();

    this.controller = container.get(BrandsControllerInterface);
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
        <BrandView />
      </ModuleProvider>
    );
  }
}
