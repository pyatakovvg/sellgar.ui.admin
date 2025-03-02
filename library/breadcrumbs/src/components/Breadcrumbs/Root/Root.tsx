import { Breadcrumb } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {}

export const Root: React.FC<React.PropsWithChildren<IProps>> = () => {
  return (
    <NavLink className={s.wrapper} to={'/'}>
      <Breadcrumb leadicon={'home-line'} label={'Главная'} showdivider={true} />
    </NavLink>
  );
};
