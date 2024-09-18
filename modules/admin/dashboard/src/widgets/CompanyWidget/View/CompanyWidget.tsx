import React from 'react';
import { observer } from 'mobx-react';

import { Loading } from './Loading';
import { Company } from './Company';

import { context } from '../company.context.ts';

import s from './default.module.scss';

export const CompanyWidget = observer(() => {
  const { presenter } = React.useContext(context);

  if (presenter.isLoading) {
    return <Loading />;
  }

  return presenter.getCompanies().map((company: any) => {
    return (
      <div key={company.uuid} className={s.wrapper}>
        <Company {...company} />
      </div>
    );
  });
});
