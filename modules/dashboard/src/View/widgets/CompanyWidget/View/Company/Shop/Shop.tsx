import { Heading, Icon } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import type { IShop } from '../../../company-widget.types.ts';

import s from './default.module.scss';

export const Shop = observer((props: IShop) => {
  const nagigate = useNavigate();

  const handleToShop = (uuid: string) => {
    nagigate('/shops/' + uuid);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Heading variant={'h5'}>{props.name}</Heading>
      </div>
      <div className={s.status}>{props.isActive ? '+' : '-'}</div>
      <div className={s.control} onClick={() => handleToShop(props.uuid)}>
        <Icon icon={'gear'} />
      </div>
    </div>
  );
});
