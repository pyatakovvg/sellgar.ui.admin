import React from 'react';
import { NavLink } from 'react-router-dom';

import { Paragraph } from '@/typography/Paragraph';

import s from './default.module.scss';

interface IProps {
  href: string;
}

export const NavLabel: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <NavLink className={s.wrapper} to={props.href}>
      <Paragraph>{props.children}</Paragraph>
    </NavLink>
  );
};
