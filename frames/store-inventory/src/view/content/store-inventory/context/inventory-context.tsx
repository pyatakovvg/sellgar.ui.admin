import { Typography } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { StoreInventoryContextControllerInterface } from '../../../../classes/controller/context';

import s from './default.module.scss';

export const InventoryContext: React.FC = () => {
  const data = useLoaderData(StoreInventoryContextControllerInterface);
  const inventory = data.offer.inventory;

  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <p className={s.title}>{data.storeProduct.product.name}</p>
      </Typography>
      <Typography size={'caption-l'}>
        <p className={s.text}>Магазин: {data.storeProduct.shop.name}</p>
      </Typography>
      <Typography size={'caption-l'}>
        <p className={s.text}>Вариант: {data.offer.variant.name}</p>
      </Typography>
      <Typography size={'caption-l'}>
        <p className={s.text}>Артикул: {data.offer.article || '-'}</p>
      </Typography>
      <div className={s.inventory}>
        <Typography size={'caption-l'}>
          <p className={s.text}>Остаток: {inventory?.quantity ?? 0}</p>
        </Typography>
        <Typography size={'caption-l'}>
          <p className={s.text}>Резерв: {inventory?.reserved ?? 0}</p>
        </Typography>
        <Typography size={'caption-l'}>
          <p className={s.text}>Доступно: {inventory?.available ?? 0}</p>
        </Typography>
      </div>
    </div>
  );
};
