import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Brand } from './components/Brand';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { BrandPresenterSymbol, BrandPresenter } from './classes/presenter/brand.presenter.ts';

interface ILoaderProps {
  uuid?: string;
}

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<BrandPresenter>(BrandPresenterSymbol);

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
        <Brand />
      </ModuleProvider>
    );
  }
}
