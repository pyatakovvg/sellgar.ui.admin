import React from 'react';

import { Create } from './create';
import { Shop } from './shop';
import { Title } from './title';

import s from './default.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Title />
      </div>
      <Shop />
      <Create />
    </div>
  );
};
