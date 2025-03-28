import { Typography, Icon, Button } from '@sellgar/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Единица измерения</h6>
        </Typography>
      </div>
      <div>
        <NavLink to={'/units/create'}>
          <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'}>
            Добавить измерение
          </Button>
        </NavLink>
      </div>
    </div>
  );
};
