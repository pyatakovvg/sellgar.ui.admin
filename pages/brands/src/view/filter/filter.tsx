import React from 'react';

import { Search } from './search';

import s from './default.module.scss';

export const Filter: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.search}>
        <Search />
      </div>
    </div>
  );
};
