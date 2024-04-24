import { Paragraph } from '@library/kit';

import React from 'react';

import { context } from '../../../users.context.ts';

import { User } from './User';

import s from './default.module.scss';

export const List: React.FC = () => {
  const { presenter } = React.useContext(context);

  return (
    <div className={s.wrapper}>
      <div className={s.filter}>
        <Paragraph>Всего {presenter.count}</Paragraph>
      </div>
      <div className={s.content}>
        {presenter.users.map((user) => (
          <div key={user.uuid} className={s.item}>
            <User user={user} />
          </div>
        ))}
      </div>
      <div className={s.control}></div>
    </div>
  );
};
