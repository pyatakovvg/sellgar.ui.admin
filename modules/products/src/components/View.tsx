import { Heading } from '@library/kit';
import { useAuthInterceptor } from '@library/app';

import React from 'react';

import { Content } from './Content';

import { context } from '../products.context.ts';

import s from './default.module.scss';

export const View = () => {
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async () => {
    await presenter.getData();
  });

  React.useEffect(() => {
    interceptor.intercept();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Продукты</Heading>
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
