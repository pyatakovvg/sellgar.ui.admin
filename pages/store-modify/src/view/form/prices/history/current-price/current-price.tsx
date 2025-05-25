import { PriceEntity } from '@library/domain';

import React from 'react';

import { EditPrice } from './edit-price';
import { ShowPrice } from './show-price';

interface IProps {
  data: PriceEntity;
  prevPrice?: PriceEntity;
  onEdit(): void;
}

export const CurrentPrice: React.FC<IProps> = (props) => {
  const [isEdit, setEdit] = React.useState(false);

  if (isEdit) {
    return <EditPrice value={props.data.value} onReset={() => setEdit(false)} />;
  }

  return <ShowPrice data={props.data} prevPrice={props.prevPrice} onEdit={() => setEdit(true)} />;
};
