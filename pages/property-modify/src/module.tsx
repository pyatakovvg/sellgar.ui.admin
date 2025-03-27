import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Property } from './components/Property';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyPresenter, PropertyPresenterSymbol } from './classes/presenter/property.presenter.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<PropertyPresenter>(PropertyPresenterSymbol);

  destroy() {
    destroy();
  }

  async loader({ params }: LoaderFunctionArgs) {
    if (params.uuid) {
      return await this.controller.findByUuid(params.uuid);
    }
    return null;
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Property />
      </ModuleProvider>
    );
  }
}
