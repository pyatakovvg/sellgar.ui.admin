import { Field, Label } from '@sellgar/kit';
import { useLoaderData } from '@library/app';
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

  return (
    <div className={s.wrapper}>
      <Field>
        <Field.Label>
          <Label label={'История цен'} />
        </Field.Label>
        <Field.Content>
          <div className={s.fields}>
            {data.prices.map((price, index) => (
              <div key={price.uuid} className={s.field}>
                {index === 0 && <CurrentPrice data={price} prevPrice={data.prices[index + 1]} onEdit={props.onEdit} />}
                {index > 0 && <Price data={price} prevPrice={data.prices[index + 1]} />}
              </div>
            ))}
          </div>
        </Field.Content>
      </Field>
    </div>
  );
});
