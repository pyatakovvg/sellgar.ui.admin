import { Button, Icon, Typography } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Свойства</h6>
        </Typography>
      </div>
      <div className={s.link}>
        <NavLink to={'/properties/groups/create'}>
          <Button size={'sm'} style={'secondary'} leadIcon={<Icon icon={'add-line'} />}>
            Добавить группу
          </Button>
        </NavLink>
      </div>
      <div className={s.link}>
        <NavLink to={'/properties/create'}>
          <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />}>
            Добавить свойство
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
