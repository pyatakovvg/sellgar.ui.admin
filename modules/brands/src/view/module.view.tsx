import React from 'react';

import { Content } from './content';
import { Filter } from './filter';
import { Header } from './header';

import s from './default.module.scss';

export const ModuleView: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.filter}>
        <Filter />
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
