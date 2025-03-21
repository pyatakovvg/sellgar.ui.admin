import { Breadcrumbs } from '@library/breadcrumbs';
import { Typography, Button, Icon } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content} role={'header'}>
        <div className={s.logotype}>
          <Typography size={'body-l'} weight={'bold'}>
            <p>SL</p>
          </Typography>
        </div>
        <div className={s.breadcrumbs}>
          <Breadcrumbs />
        </div>
      </div>
      <div className={s.control}>
        <Button style={'secondary'} size={'sm'} leadIcon={<Icon icon={'logout-box-line'} />}>
          Выход
        </Button>
      </div>
    </div>
  );
};
