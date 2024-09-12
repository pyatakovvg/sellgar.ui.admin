import { Paragraph } from '@library/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface ICurrency {
  code: string;
  value: string;
  description: string;
}

export interface IPrice {
  price: number;
  prevPrice: number | null;
  description: string;
  currency: ICurrency;
}

interface IProps {
  price?: IPrice;
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
