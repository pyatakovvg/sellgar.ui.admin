import { Typography, Button, Icon } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Магазины</h6>
        </Typography>
      </div>
      <div className={s.content}>
        <NavLink to={'/shops/create'}>
          <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />}>
            Добавить магазин
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
