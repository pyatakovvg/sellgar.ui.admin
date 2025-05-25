import { type IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { CategoryView } from './view';

import { ModuleProvider } from './module.provider.tsx';
import { create, destroy } from './classes/classes.di.ts';
import { CategoryControllerInterface } from './classes/controller/category-controller.interface.ts';

export class ClassModule implements IClassModule {
  private readonly controller: CategoryControllerInterface;

  constructor() {
    const container = create();

    this.controller = container.get(CategoryControllerInterface);
  }

  destructor() {
    destroy();
  }

  async loader(args: LoaderFunctionArgs) {
    await this.controller.findAll();

    if (args.params.uuid) {
      return await this.controller.findByUuid(args.params.uuid);
    }
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <CategoryView />
      </ModuleProvider>
    );
  }
}
