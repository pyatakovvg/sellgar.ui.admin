import { Heading, Underlay } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { Price } from './Price';
import { CurrentPrice } from './CurrentPrice';

import { useGetPricesData } from '../../../../../../../hooks/get-prices-data.hook.ts';

import s from './default.module.scss';

interface IProps {
  onEdit(): void;
}

export const History: React.FC<IProps> = observer((props) => {
  const prices = useGetPricesData();

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H4'}>История цен</Heading>
      </div>
      <div className={s.content}>
        <Underlay>
          <div className={s.fields}>
            {prices.map((price, index) => (
              <div key={price.uuid} className={s.field}>
                {index === 0 && <CurrentPrice data={price} prevPrice={prices[index + 1]} onEdit={props.onEdit} />}
                {index > 0 && <Price data={price} prevPrice={prices[index + 1]} />}
              </div>
            ))}
          </div>
        </Underlay>
      </div>
    </div>
  );
});
