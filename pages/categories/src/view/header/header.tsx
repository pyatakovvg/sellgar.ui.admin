import { Typography, Icon, Button } from '@sellgar/kit';
import { CategoryModifyFrame } from '@frame/category-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  const frame = useFrame(CategoryModifyFrame);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Категории</h6>
        </Typography>
      </div>
      <div>
        <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'} onClick={() => void frame.open({})}>
          Добавить категорию
        </Button>
      </div>
    </div>
  );
};
