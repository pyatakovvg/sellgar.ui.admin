import React from 'react';
import { observer } from 'mobx-react';

import { CompanyWidgetModule } from './widgets/CompanyWidget';

import s from './default.module.scss';

export const DashboardView = observer(() => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.container}>
          <div className={s.section}>
            <CompanyWidgetModule />
          </div>
          <div className={s.section}>
            <CompanyWidgetModule />
          </div>
          <div className={s.section}>
            <CompanyWidgetModule />
          </div>
        </div>
      </div>
    </div>
  );
});
