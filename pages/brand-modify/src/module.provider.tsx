import React from 'react';

import { Provider } from './module.context.ts';
import { BrandPresenter } from './classes/presenter/brand.presenter.ts';

interface IProps {
  controller: BrandPresenter;
}

export const ModuleProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <Provider
      value={{
        presenter: props.controller,
      }}
    >
      {props.children}
    </Provider>
  );
};
