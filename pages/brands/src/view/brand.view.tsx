import { BrandDrawer } from '@drawer/brand-modify';
import { useLoaderRevalidate } from '@library/app';

import React from 'react';

import { Header } from './header';
import { Filter } from './filter';
import { Content } from './content';

import s from './default.module.scss';

export const BrandView = () => {
  const { inProcess } = useLoaderRevalidate();

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
        {inProcess ? 'update' : null}
      </div>
      <div className={s.filter}>
        <Filter />
      </div>
      <div className={s.content}>
        <Content />
      </div>
      <BrandDrawer />
    </div>
  );
};
