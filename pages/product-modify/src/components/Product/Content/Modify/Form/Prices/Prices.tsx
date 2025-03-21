import React from 'react';
import { useParams } from 'react-router-dom';

import { Price } from './Price';
import { History } from './History';

export const Prices: React.FC = () => {
  const { uuid } = useParams();

  const [isEdit, setEdit] = React.useState(!uuid);

  if (isEdit) {
    return <Price />;
  }

  return <History onEdit={() => setEdit(true)} />;
};
