import { dateFormat } from '@utils/format';
import { OperationEntity } from '@library/domain';
import { Heading, Text, Amount } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  data: OperationEntity;
}

export const Operation: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.info}>
        <div className={s.description}>
          <Heading variant={'H5'}>{props.data.description}</Heading>
        </div>
        <div className={s.value}>
          <Amount value={props.data.amount} currency={props.data.currency} />
        </div>
      </div>
      <div className={s.date}>
        <Text variant={'compact'}>{dateFormat(props.data.createdAt)}</Text>
      </div>
    </div>
  );
};
