import { Breadcrumb, Icon } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  hasCrumbs: boolean;
}

export const Root: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <NavLink className={s.wrapper} to={'/'} viewTransition={true}>
      <Breadcrumb leadIcon={<Icon icon={'home-line'} />} label={'Главная'} showDivider={props.hasCrumbs} />
    </NavLink>
  );
};
