import type { IClassModule, IClassModuleArgs } from '@library/app';

import React from 'react';

import { Files } from './components/Files';
import { ModuleProvider } from './module.provider.tsx';

import { containerModule } from './classes/classes.di.ts';
import { FilesPresenter, FilesPresenterSymbol } from './classes/presenter/files.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: FilesPresenter;

  constructor({ container }: IClassModuleArgs) {
    container.loadSync(containerModule);

    this.controller = container.get(FilesPresenterSymbol);
  }

  destructor({ container }: IClassModuleArgs) {
    container.unloadSync(containerModule);
  }

  async loader(args: IClassModuleArgs) {
    return await this.controller.findAll(args.params);
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Files />
      </ModuleProvider>
    );
  }
}
