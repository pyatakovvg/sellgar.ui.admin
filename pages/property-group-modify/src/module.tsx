import { type IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { PropertyGroup } from './components/PropertyGroup';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyGroupPresenter, PropertyGroupPresenterSymbol } from './classes/presenter/property-group.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: PropertyGroupPresenter;

  constructor() {
    const container = create();

    this.controller = container.get<PropertyGroupPresenter>(PropertyGroupPresenterSymbol);
  }

  destructor() {
    destroy();
  }

  async loader(args: LoaderFunctionArgs) {
    if (args.params.uuid) {
      return await this.controller.findByUuid(args.params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <PropertyGroup />
      </ModuleProvider>
    );
  }
}
