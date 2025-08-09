import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { BrandView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { BrandControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface ILoaderParams {
  uuid?: string;
}

export class ClassModule implements IClassModule {
  private readonly controller: BrandControllerInterface;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(BrandControllerInterface);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    const params = args.params as never as ILoaderParams;

    console.log(params);

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
