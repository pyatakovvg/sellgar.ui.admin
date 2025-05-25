import { type IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Unit } from './components/Unit';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { UnitPresenter, UnitPresenterSymbol } from './classes/presenter/unit.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: UnitPresenter;

  constructor() {
    const container = create();

    this.controller = container.get<UnitPresenter>(UnitPresenterSymbol);
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
        <Unit />
      </ModuleProvider>
    );
  }
}
