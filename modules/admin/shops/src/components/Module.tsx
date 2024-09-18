import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../shops.context';

import { Content } from './Content';

import s from './default.module.scss';

export const Module = observer(() => {
  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    (async () => presenter.getData())();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Магазины</Heading>
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
});
