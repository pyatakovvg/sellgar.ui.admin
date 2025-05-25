import { Typography, FieldWrapper, Label } from '@sellgar/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { Price } from './price';
import { CurrentPrice } from './current-price';

import { usePresenter } from '../../../../hooks/presenter.hook.ts';

import s from './default.module.scss';

interface IProps {
  onEdit(): void;
}

export const History: React.FC<IProps> = observer((props) => {
  const presenter = usePresenter();

  return (
    <div className={s.wrapper}>
      <FieldWrapper>
        <FieldWrapper.Label>
          <Label label={'История цен'} />
        </FieldWrapper.Label>
        <FieldWrapper.Content>
          <div className={s.fields}>
            {presenter.priceStore.prices.map((price, index) => (
              <div key={price.uuid} className={s.field}>
                {index === 0 && (
                  <CurrentPrice data={price} prevPrice={presenter.priceStore.prices[index + 1]} onEdit={props.onEdit} />
                )}
                {index > 0 && <Price data={price} prevPrice={presenter.priceStore.prices[index + 1]} />}
              </div>
            ))}
          </div>
        </FieldWrapper.Content>
      </FieldWrapper>
    </div>
  );
});
