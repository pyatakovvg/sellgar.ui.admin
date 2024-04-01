import React from 'react';
import { observer } from 'mobx-react';

import { Loading } from './Loading';
import { Company } from './Company';

import { context } from '../company-widget.context.ts';

import s from './default.module.scss';

export const CompanyWidget = observer(() => {
  const { controller } = React.useContext(context);

  if (controller.isLoading) {
    return <Loading />;
  }

  return controller.company.map((company: any) => {
    return (
      <div key={company.uuid} className={s.wrapper}>
        <Company {...company} />
      </div>
    );
  });
});
