import { PriceEntity } from '@library/domain';
import { Text, Description, Icon, AmountInput } from '@library/kit';

import React from 'react';
import { format } from 'date-fns';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  data: PriceEntity;
  prevPrice?: PriceEntity;
  onEdit(): void;
}

const directionPriceStatus = (price: number, prevPrice?: number) => {
  if (!prevPrice) {
    return undefined;
  }
  if (price > prevPrice) {
    return 'up';
  } else if (price < prevPrice) {
    return 'down';
  } else if (price === prevPrice) {
    return 'same';
  }
  return undefined;
};

export const ShowPrice: React.FC<IProps> = (props) => {
  const direction = React.useMemo(() => {
    return directionPriceStatus(props.data.value, props.prevPrice?.value);
  }, [props.data, props.prevPrice]);
  const difference = React.useMemo(() => {
    return props.prevPrice?.value ? Math.abs(props.data.value - props.prevPrice.value) : 0;
  }, [props.data, props.prevPrice]);

  return (
    <div className={s.wrapper}>
      <div className={s.price}>
        <Text>{AmountInput.format(props.data.value)}</Text>
      </div>
      <div className={s.currency}>
        <Text>{props.data.currency.name}</Text>
      </div>
      <div className={s.date}>
        <Description>(изменено {format(props.data.createdAt, 'dd.MM.yyyy')})</Description>
      </div>
      {direction && (
        <div
          className={cn(s.direction, {
            [s.up]: direction === 'up',
            [s.down]: direction === 'down',
            [s.same]: direction === 'same',
          })}
        >
          {direction === 'up' && <Icon icon={'arrow_drop_up'} size={14} />}
          {direction === 'down' && <Icon icon={'arrow_drop_down'} size={14} />}
          {direction === 'same' && <Icon icon={'horizontal_rule'} size={14} />}
        </div>
      )}
      <div className={s.control}>
        <span className={s.edit} onClick={props.onEdit}>
          <Icon icon={'create'} size={18} />
        </span>
      </div>
    </div>
  );
};
