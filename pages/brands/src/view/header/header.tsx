import { Typography, Icon, Button } from '@sellgar/kit';

import React from 'react';

import { context } from '../modify';

import s from './default.module.scss';

export const Header = () => {
  const { onOpen } = React.useContext(context);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Бренд</h6>
        </Typography>
      </div>
      <div>
        <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'} onClick={() => onOpen()}>
          Добавить бренд
        </Button>
      </div>
    </div>
  );
};
