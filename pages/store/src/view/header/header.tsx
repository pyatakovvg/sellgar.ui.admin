import { StoreModifyFrame } from '@frame/store-modify';
import { Typography, Button, Icon } from '@sellgar/kit';
import { NavigateLayout } from '@layout/navigate';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  const storeModifyFrame = useFrame(StoreModifyFrame);

  const handleNewProduct = () => {
    void storeModifyFrame.open({});
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Товары на складе</h6>
        </Typography>
      </div>
      <NavigateLayout.Slot>
        <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />} onClick={() => handleNewProduct()}>
          Добавить товар на склад
        </Button>
      </NavigateLayout.Slot>
    </div>
  );
};
