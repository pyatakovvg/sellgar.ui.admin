import { Text } from '@library/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  href: string;
  inProcess: boolean;
}

export const NavLabel: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  if (props.inProcess) {
    return <p>Loading...</p>;
  }
  return (
    <NavLink className={s.wrapper} to={props.href}>
      <Text>{props.children}</Text>
    </NavLink>
  );
};
