import { Typography, Button, Icon } from '@sellgar/kit';
import { ShopModifyFrame } from '@frame/shop-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  const frame = useFrame(ShopModifyFrame);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Магазины</h6>
        </Typography>
      </div>
      <div className={s.content}>
        <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />} onClick={() => void frame.open({})}>
          Добавить магазин
        </Button>
      </div>
    </div>
  );
};
