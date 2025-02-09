import { Heading } from '@library/kit';

import React from 'react';

import { EditPrice } from '../History/CurrentPrice/EditPrice';

import s from './default.module.scss';

export const Price: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H4'}>Цена</Heading>
      </div>
      <div className={s.content}>
        <EditPrice value={0} />
      </div>
    </div>
  );
};
