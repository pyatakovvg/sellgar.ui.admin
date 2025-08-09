import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { PropertyGroup } from './components/PropertyGroup';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { PropertyGroupPresenter, PropertyGroupPresenterSymbol } from './classes/presenter/property-group.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: PropertyGroupPresenter;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get<PropertyGroupPresenter>(PropertyGroupPresenterSymbol);
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
        <PropertyGroup />
      </ModuleProvider>
    );
  }
}
