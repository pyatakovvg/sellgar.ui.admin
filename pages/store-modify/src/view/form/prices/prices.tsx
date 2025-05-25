import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { Price } from './price';
import { History } from './history';

export const Prices: React.FC = () => {
  const data = useLoaderData();

  const [isEdit, setEdit] = React.useState(!data);

  if (isEdit) {
    return <Price />;
  }

  return <History onEdit={() => setEdit(true)} />;
};
