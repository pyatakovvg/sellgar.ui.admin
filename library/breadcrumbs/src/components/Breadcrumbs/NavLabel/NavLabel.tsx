import { Breadcrumb } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  href: string;
  label: string;
  inProcess: boolean;
}

export const NavLabel: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  if (props.inProcess) {
    return <p>Loading...</p>;
  }
  return (
    <NavLink className={s.wrapper} to={props.href}>
      <Breadcrumb showdivider={true} label={props.label} />
    </NavLink>
  );
};
