import type { StoreAccountingRecordEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import React from 'react';
import s from './default.module.scss';

interface IProps {
  record: StoreAccountingRecordEntity;
}

const ClarificationsComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'}>
        {props.record.clarifications.length
          ? props.record.clarifications.map((item) => (
              <p key={item.position} className={s.value}>
                {item.value}
              </p>
            ))
          : 'Без уточнений'}
      </Typography>
    </div>
  );
};

export const Clarifications = App.reactive(ClarificationsComponent);
