import { useLoaderData } from '@sellgar/app/react';
import { Typography, Divider, Notification } from '@sellgar/kit';
import { InfoLine } from '@library/design';

import React from 'react';

import { ShopModifyControllerInterface } from '../../../classes/controller/shop-modify/shop-modify-controller.interface.ts';

import s from './default.module.css';

const purpose = {
  support: 'Поддержка',
  claims: 'Претензии',
  receipts: 'Кассовые чеки',
};

export const Contacts: React.FC = () => {
  const data = useLoaderData(ShopModifyControllerInterface);

  return (
    <div className={s.wrapper}>
      <Divider type={'label-center'} label={'Публичные контакты'} />
      <div className={s.content}>
        {!data.contacts.length && <Notification.Static status={'warning'} description={'Нет данных'} />}
        {data.contacts.map((contact) => {
          return (
            <InfoLine
              key={contact.uuid}
              label={
                <Typography size={'caption-m'} weight={'semi-bold'}>
                  <p className={s.title}>{purpose[contact.purpose]}:</p>
                </Typography>
              }
              value={
                <Typography size={'caption-m'} weight={'regular'}>
                  <p className={s.value}>{contact.value}</p>
                </Typography>
              }
            />
          );
        })}
      </div>
    </div>
  );
};
