import { Substrate } from '@library/kit';

import React from 'react';

import { CompanyWidget } from './View';
import { Provider } from './company-widget.context.ts';
import { CompanyWidgetController } from './company-widget.controller.ts';

import s from './default.module.scss';

export const CompanyWidgetModule = () => {
  const [controller] = React.useState(() => new CompanyWidgetController());

  React.useEffect(() => {
    controller.getData();
  }, []);

  return (
    <Provider value={{ controller }}>
      <div className={s.wrapper}>
        <Substrate>
          <CompanyWidget />
        </Substrate>
      </div>
    </Provider>
  );
};
