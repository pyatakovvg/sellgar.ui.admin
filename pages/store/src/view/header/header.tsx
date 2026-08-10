import { NavigateLayout } from '@layout/navigate';

import React from 'react';

import { Create } from './create';
import { Title } from './title';

import s from './default.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Title />
      </div>
      <NavigateLayout.Slot>
        <Create />
      </NavigateLayout.Slot>
    </div>
  );
};
