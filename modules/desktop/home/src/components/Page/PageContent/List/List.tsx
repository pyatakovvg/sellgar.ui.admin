import { Substrate } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { useBuckets } from '@/hooks/useBuckets.ts';

import { Bucket } from './Bucket';

import s from './default.module.scss';

export const List: React.FC = observer(() => {
  const buckets = useBuckets();

  return (
    <Substrate>
      <div className={s.wrapper} data-title={'list'}>
        {buckets.map((bucket) => (
          <div key={bucket.uuid} className={s.item}>
            <Bucket bucket={bucket} />
          </div>
        ))}
      </div>
    </Substrate>
  );
});
