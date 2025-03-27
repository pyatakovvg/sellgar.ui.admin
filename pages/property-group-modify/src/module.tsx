import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { PropertyGroup } from './components/PropertyGroup';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyGroupPresenter, PropertyGroupPresenterSymbol } from './classes/presenter/property-group.presenter.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<PropertyGroupPresenter>(PropertyGroupPresenterSymbol);

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
        <PropertyGroup />
      </ModuleProvider>
    );
  }
}
