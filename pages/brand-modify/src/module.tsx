import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { BrandView } from './view';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { BrandControllerInterface } from './classes/controller/brand-controller.interface.ts';

interface ILoaderProps {
  uuid?: string;
}

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<BrandControllerInterface>(BrandControllerInterface);

  destroy() {
    destroy();
  }

  loader = async ({ params }: LoaderFunctionArgs) => {
    const { uuid } = params as ILoaderProps;

    return await this.controller.findByUuid(uuid);
  };

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <BrandView />
      </ModuleProvider>
    );
  }
}
