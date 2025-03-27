import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Files } from './components/Files';
import { ModuleProvider } from './module.provider.tsx';

import { create, destroy } from './classes/classes.di.ts';
import { FilesPresenter, FilesPresenterSymbol } from './classes/presenter/files.presenter.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<FilesPresenter>(FilesPresenterSymbol);

  destroy() {
    destroy();
  }

  async loader({ params }: LoaderFunctionArgs) {
    return this.controller.findAll(params);
  }

  render() {
    return (
      <ModuleProvider controller={this.controller}>
        <Files />
      </ModuleProvider>
    );
  }
}
