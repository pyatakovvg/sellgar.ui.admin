import { Paragraph } from '@library/kit';

import React from 'react';

import { PriceEntity } from '../../../../../classes/repository/entity/price.entity.ts';

interface IProps {
  price?: PriceEntity;
}

export const Price: React.FC<IProps> = (props) => {
  if (!props.price) {
    return <Paragraph>---</Paragraph>;
  }
  return (
    <Paragraph>
      {props.price.price} {props.price.currency.value}
    </Paragraph>
  );
};
