import React from 'react';
import { observer } from 'mobx-react';

import { useUsers } from '@/hooks/useUsers.ts';

import { List } from './List';
import { Empty } from './Empty';
import { Paging } from './Paging';

import s from './default.module.scss';

export const Content: React.FC = observer(() => {
  const users = useUsers();

  if (!users.length) return <Empty />;

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <List />
      </div>
      <div className={s.control}>
        <Paging />
      </div>
    </div>
  );
});
