import { Icon, useCellData } from '@sellgar/kit';
import { StoreEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Showing: React.FC = () => {
  const { data } = useCellData<StoreEntity>();

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {data.showing && (
          <span className={s.showing}>
            <Icon icon={'eye-2-line'} />
          </span>
        )}
        {!data.showing && (
          <span className={s.hidden}>
            <Icon icon={'eye-close-line'} />
          </span>
        )}
      </div>
    </div>
  );
};
