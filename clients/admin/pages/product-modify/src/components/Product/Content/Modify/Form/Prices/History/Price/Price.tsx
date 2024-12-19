import { PriceEntity } from '@library/domain';
import { Text, Description, Icon } from '@library/kit';

import React from 'react';
import { format } from 'date-fns';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  data: PriceEntity;
  prevPrice?: PriceEntity;
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

export const Price: React.FC<IProps> = (props) => {
  const direction = React.useMemo(() => {
    return directionPriceStatus(props.data.value, props.prevPrice?.value);
  }, [props.data, props.prevPrice]);
  const difference = React.useMemo(() => {
    return props.prevPrice?.value ? Math.abs(props.data.value - props.prevPrice.value) : 0;
  }, [props.data, props.prevPrice]);

  return (
    <div className={s.wrapper}>
      <div className={s.price}>
        <Text variant={'compact'}>{props.data.value}</Text>
      </div>
      <div className={s.currency}>
        <Text variant={'compact'}>{props.data.currency.name}</Text>
      </div>
      <div className={s.date}>
        <Description variant={'compact'}>(изменено {format(props.data.createdAt, 'dd.MM.yyyy')})</Description>
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
    </div>
  );
};
