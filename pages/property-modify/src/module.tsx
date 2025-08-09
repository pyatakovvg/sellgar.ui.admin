import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { Property } from './components/Property';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { PropertyPresenter, PropertyPresenterSymbol } from './classes/presenter/property.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: PropertyPresenter;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get<PropertyPresenter>(PropertyPresenterSymbol);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    if (args.params?.uuid) {
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
