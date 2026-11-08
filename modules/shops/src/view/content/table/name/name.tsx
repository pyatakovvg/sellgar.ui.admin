import type { ShopEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  shop: ShopEntity;
}

export const Name: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p className={s.name}>{props.shop.name}</p>
      </Typography>
    </div>
  );
};
