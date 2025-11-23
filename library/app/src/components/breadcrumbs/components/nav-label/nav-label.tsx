import { Breadcrumb } from '@sellgar/kit';

import React from 'react';
import * as ReactRouter from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  href: string;
  label: string;
}

export const NavLabel: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <ReactRouter.NavLink className={s.wrapper} to={props.href} viewTransition={true}>
      <Breadcrumb showDivider={true} label={props.label} />
    </ReactRouter.NavLink>
  );
};
