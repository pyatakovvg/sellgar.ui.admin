import { Heading } from '@library/kit';
import { amountFormat } from '@utils/format';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  className?: string;
  value: number;
  currency: string;
}

export const Wallet: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.amount}>
        <Heading variant={'H2'}>{amountFormat(props.value)}</Heading>
      </div>
      <div className={s.currency}>
        <Heading>{props.currency}</Heading>
      </div>
    </div>
  );
};
