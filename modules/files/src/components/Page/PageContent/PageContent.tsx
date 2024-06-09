import React from 'react';
import { observer } from 'mobx-react';

import { List } from './List';
import { Control } from './Control';

import s from './default.module.scss';

export const PageContent: React.FC = observer(() => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Control />
      </div>
      <div className={s.content}>
        <List />
      </div>
    </div>
  );
});
