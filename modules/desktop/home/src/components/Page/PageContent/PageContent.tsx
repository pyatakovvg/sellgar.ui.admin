import React from 'react';
import { observer } from 'mobx-react';

import { useBuckets } from '@/hooks/useBuckets.ts';

import { List } from './List';
import { Empty } from './Empty';

import s from './default.module.scss';

export const PageContent: React.FC = observer(() => {
  const users = useBuckets();

  if (!users.length)
    return (
      <div className={s.wrapper}>
        <div className={s.content}>
          <Empty />
        </div>
      </div>
    );

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <List />
      </div>
    </div>
  );
});
