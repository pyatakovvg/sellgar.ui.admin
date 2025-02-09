import React from 'react';

import { Provider } from './module.context.ts';
import { container } from './classes/classes.di.ts';
import { CategoryPresenter, CategoryPresenterSymbol } from './classes/presenter/category.presenter.ts';

export const ModuleProvider: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Provider
      value={{
        presenter: container.get<CategoryPresenter>(CategoryPresenterSymbol),
      }}
    >
      {props.children}
    </Provider>
  );
};
