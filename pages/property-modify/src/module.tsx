import { type IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Property } from './components/Property';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { PropertyPresenter, PropertyPresenterSymbol } from './classes/presenter/property.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: PropertyPresenter;

  constructor() {
    const container = create();

    this.controller = container.get<PropertyPresenter>(PropertyPresenterSymbol);
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
        <Property />
      </ModuleProvider>
    );
  }
}
