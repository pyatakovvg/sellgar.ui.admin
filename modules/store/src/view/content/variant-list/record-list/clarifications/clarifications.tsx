import type { StoreAccountingRecordEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography, useCellData } from '@sellgar/kit';
import React from 'react';
import s from './default.module.scss';

const ClarificationsComponent: React.FC = () => {
  const { data } = useCellData<StoreAccountingRecordEntity>();
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'}>
        {data.clarifications.length
          ? data.clarifications.map((item) => (
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
