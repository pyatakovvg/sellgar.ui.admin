import { StoreEntity } from '@library/domain';

import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { Price } from './price';
import { History } from './history';

export const Prices: React.FC = () => {
  const [data] = useLoaderData<[StoreEntity]>();

  const [isEdit, setEdit] = React.useState(() => !data.currentPrice);

  if (isEdit) {
    return <Price />;
  }

  return <History onEdit={() => setEdit(true)} />;
};
