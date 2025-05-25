import { type IClassModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Files } from './components/Files';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { FilesPresenter, FilesPresenterSymbol } from './classes/presenter/files.presenter.ts';

export class ClassModule implements IClassModule {
  private readonly controller: FilesPresenter;

  constructor() {
    const container = create();

    this.controller = container.get(FilesPresenterSymbol);
  }

  destructor() {
    destroy();
  }

  async loader(args: LoaderFunctionArgs) {
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
