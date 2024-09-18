import { Paragraph, Spinner } from '@library/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  href: string;
  inProcess: boolean;
}

export const NavLabel: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  if (props.inProcess) {
    return <Spinner />;
  }
  return (
    <NavLink className={s.wrapper} to={props.href}>
      <Paragraph>{props.children}</Paragraph>
    </NavLink>
  );
};
