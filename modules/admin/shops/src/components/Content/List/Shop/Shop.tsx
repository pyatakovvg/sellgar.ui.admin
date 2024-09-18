import { ShopEntity } from '@library/domain';

import React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Shop: React.FC<ShopEntity> = observer((props) => {
  return (
    <div className={s.wrapper}>
      <NavLink to={'/shops/' + props.uuid}>{props.name}</NavLink>
      <NavLink to={'/company/' + props.company.uuid}>{props.company.name}</NavLink>
    </div>
  );
});
