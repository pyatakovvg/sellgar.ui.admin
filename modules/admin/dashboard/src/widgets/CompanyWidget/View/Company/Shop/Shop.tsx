import { Heading, Icon } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Status } from './Status';

import type { IShop } from '../../../company-widget.types.ts';

import cn from 'classnames';
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
      <div className={s.status}>
        <Status status={props.isActive ? 'active' : 'not-active'} />
      </div>
      <div className={cn(s.control, s.edit)} onClick={() => handleToShop(props.uuid)}>
        <Icon icon={'gear'} />
      </div>
      <div className={cn(s.control, s.delete)} onClick={() => handleToShop(props.uuid)}>
        <Icon icon={'trash'} />
      </div>
    </div>
  );
});
