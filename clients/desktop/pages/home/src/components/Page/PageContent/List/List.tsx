'use client';

import { Underlay } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { useBuckets } from '../../../../hooks/useBuckets.ts';

import { Bucket } from './Bucket';

import s from './default.module.scss';

export const List: React.FC = observer(() => {
  const buckets = useBuckets();

  return (
    <Underlay>
      <div className={s.wrapper} data-title={'list'}>
        {buckets.map((bucket, index) => (
          <div key={index} className={s.item}>
            <Bucket bucket={bucket} />
          </div>
        ))}
      </div>
    </Underlay>
  );
});
