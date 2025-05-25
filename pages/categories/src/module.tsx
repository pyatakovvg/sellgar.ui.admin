import { type IClassModule } from '@library/app';

import React from 'react';

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

  async loader() {
    await this.controller.findAll();
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <CategoryView />
      </ModuleProvider>
    );
  }
}
