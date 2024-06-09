import { Paragraph } from '@library/kit';
import { PriceEntity } from '@library/domain';

import React from 'react';

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
