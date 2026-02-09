import { Typography, Icon } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <Icon className={s.icon} icon={'copyright-line'} />
      <Typography size={'h6'} weight={'semi-bold'}>
        <h2 className={s.text}>Бренды</h2>
      </Typography>
    </div>
  );
};
