import React from 'react';

import { Filter } from './Filter';
import { Proxy } from './Proxy';

import s from './default.module.scss';

export const PageContent: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.filter}>
        <Filter />
      </div>
      <div className={s.content}>
        <Proxy />
      </div>
    </div>
  );
};
