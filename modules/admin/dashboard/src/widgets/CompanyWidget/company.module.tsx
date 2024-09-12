import { Substrate } from '@library/kit';
import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { CompanyWidget } from './View';

import { Provider } from './company.context.ts';

import { container } from './classes/classes.di.ts';
import { CompanyPresenter, CompanyPresenterSymbol } from './classes/presenter/company.presenter.ts';

import s from './default.module.scss';

export const CompanyModule = () => {
  const [presenter] = React.useState(() => container.get<CompanyPresenter>(CompanyPresenterSymbol));

  const interceptor = useAuthInterceptor(async () => {
    await presenter.getData();
  });

  React.useEffect(() => {
    interceptor.intercept();
  }, []);

  return (
    <Provider value={{ presenter }}>
      <div className={s.wrapper}>
        <Substrate>
          <CompanyWidget />
        </Substrate>
      </div>
    </Provider>
  );
};
