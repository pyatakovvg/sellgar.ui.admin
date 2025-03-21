import { Typography, Icon, Button } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Категории</h6>
        </Typography>
      </div>
      <div>
        <NavLink to={'/categories/create'}>
          <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'}>
            Добавить категорию
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
