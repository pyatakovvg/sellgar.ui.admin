'use client';

import React from 'react';
import { Link as NavLink, LinkProps } from 'react-router-dom';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps extends Omit<LinkProps, 'to'> {
  className?: string;
  href: string;
}

export const Link: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const className = React.useMemo(() => cn(s.text, props.className), [props.className]);

  return (
    <NavLink {...props} to={import.meta.env.BASE_URL.replace(/\/$/, '') + props.href} className={className}>
      {props.children}
    </NavLink>
  );
};
