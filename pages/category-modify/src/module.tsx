import { ApplicationModule } from '@library/app';

import React from 'react';
import { LoaderFunctionArgs } from 'react-router-dom';

import { Provider } from './module.context.ts';
import { Category } from './components/Category';

import { create, destroy } from './classes/classes.di.ts';
import { CategoryPresenter, CategoryPresenterSymbol } from './classes/presenter/category.presenter.ts';

export class Module implements ApplicationModule {
  private readonly container = create();
  private readonly controller = this.container.get<CategoryPresenter>(CategoryPresenterSymbol);

  create() {
    console.log('create');
  }

  destroy() {
    console.log('destroy');
    destroy();
  }

  async loader({ params }: LoaderFunctionArgs) {
    if (params.uuid) {
      return await this.controller.findByUuid(params.uuid);
    }
  }

  render() {
    return (
      <Provider value={{ presenter: this.controller }}>
        <Category />
      </Provider>
    );
  }
}
