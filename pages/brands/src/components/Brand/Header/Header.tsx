import { Typography, Button } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Бренд</h6>
        </Typography>
      </div>
      <div>
        <NavLink to={'/brands/create'}>
          <Button leadicon={'add-fill'} size={'sm'}>
            Добавить бренд
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
