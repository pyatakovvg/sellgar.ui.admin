import { Modal, Typography } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../classes/controller/context';

import s from './default.module.scss';

export const Header: React.FC = () => {
  const data = useLoaderData(StoreInventoryContextControllerInterface);

  return (
    <div className={s.wrapper}>
      <Typography size={'body-l'}>
        <p className={s.label}>Остаток: {data.offer.variant.name}</p>
      </Typography>
      <Modal.Close />
    </div>
  );
};
