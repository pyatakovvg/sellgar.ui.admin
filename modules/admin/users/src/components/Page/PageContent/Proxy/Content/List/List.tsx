import { Substrate } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { useUsers } from '@/hooks/useUsers.ts';

import { User } from './User';

import s from './default.module.scss';

export const List: React.FC = observer(() => {
  const users = useUsers();

  return (
    <Substrate>
      <div className={s.wrapper} data-title={'list'}>
        {users.map((user) => (
          <div key={user.uuid} className={s.item}>
            <User user={user} />
          </div>
        ))}
      </div>
    </Substrate>
  );
});
