import React from 'react';

import { Title } from './title';
import { Create } from './create';

import s from './default.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Title />
      </div>
      <div className={s.create}>
        <Create />
      </div>
    </div>
  );
};
