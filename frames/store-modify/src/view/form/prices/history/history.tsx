import { Field, Label } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';
import { StoreEntity } from '@library/domain';

import React from 'react';
import { observer } from 'mobx-react';

import { Price } from './price';
import { CurrentPrice } from './current-price';

import s from './default.module.scss';

interface IProps {
  onEdit(): void;
}

export const History: React.FC<IProps> = observer((props) => {
  const [data] = useLoaderData<[StoreEntity]>();
  const firstOffer = data.offers[0];
  const prices = firstOffer?.prices ?? [];

  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <Label label={'История цен'} />
        </Field.Label>
        <Field.Content>
          <div className={s.fields}>
            {prices.map((price, index) => (
              <div key={price.uuid} className={s.field}>
                {index === 0 && <CurrentPrice data={price} prevPrice={prices[index + 1]} onEdit={props.onEdit} />}
                {index > 0 && <Price data={price} prevPrice={prices[index + 1]} />}
              </div>
            ))}
          </div>
        </Field.Content>
      </Field>
    </div>
  );
});
