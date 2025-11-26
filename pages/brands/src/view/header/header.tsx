import { Typography, Icon, Button } from '@sellgar/kit';
import { useNavigate } from '@library/app';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Бренд</h6>
        </Typography>
      </div>
      <div>
        <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'} onClick={() => navigate.hash({ modal: {} })}>
          Добавить бренд
        </Button>
      </div>
    </div>
  );
};
