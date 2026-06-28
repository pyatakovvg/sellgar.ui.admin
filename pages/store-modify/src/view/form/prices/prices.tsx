import { StoreProductEntity } from '@library/domain';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { Price } from './price';
import { History } from './history';
import { StoreControllerInterface } from '../../../classes/controller/store-controller.interface.ts';

export const Prices: React.FC = () => {
  const data = useLoaderData(StoreControllerInterface) as StoreProductEntity;
  const firstOffer = data.offers[0];

  const [isEdit, setEdit] = React.useState(() => !firstOffer?.currentPrice);

  if (isEdit) {
    return <Price />;
  }

  return <History onEdit={() => setEdit(true)} />;
};
