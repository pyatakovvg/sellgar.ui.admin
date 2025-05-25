import type { IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { BrandView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { BrandControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface ILoaderParams {
  uuid?: string;
}

export class ClassModule implements IClassModule {
  private readonly controller: BrandControllerInterface;

  constructor() {
    const container = create();

    this.controller = container.get(BrandControllerInterface);
  }

  destructor() {
    destroy();
  }

  async loader(args: LoaderFunctionArgs) {
    const params = args.params as never as ILoaderParams;

    if (params.uuid) {
      return await this.controller.findByUuid(params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <BrandView />
      </ModuleProvider>
    );
  }
}
