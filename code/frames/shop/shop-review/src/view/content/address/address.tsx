import { useLoaderData } from '@sellgar/app/react';
import { Typography, Divider, Notification } from '@sellgar/kit';
import { InfoLine } from '@library/design';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

const purpose = {
  returns: 'Возвраты',
  claims: 'Претензии',
  pickup: 'Самовывоз',
};

export const Address: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Адреса'} />
      <div className={s.content}>
        {!data.addresses.length && <Notification.Static status={'warning'} description={'Нет данных'} />}
        {data.addresses.map((address) => {
          return (
            <InfoLine
              key={address.uuid}
              label={
                <Typography size={'caption-m'} weight={'semi-bold'}>
                  <p className={s.title}>{purpose[address.type]}:</p>
                </Typography>
              }
              value={
                <Typography size={'caption-m'} weight={'regular'}>
                  <p className={s.value}>{address.address}</p>
                </Typography>
              }
            />
          );
        })}
      </div>
    </div>
  );
};
