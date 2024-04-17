import { Heading, Paragraph } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../permission.context.ts';

import s from './default.module.scss';

export const Permission = observer(() => {
  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    presenter.getAll();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h3'}>Разрешение</Heading>
      </div>
      <div className={s.content}>
        {presenter.permissions.map((role) => {
          return (
            <div key={role.code}>
              <Paragraph>{role.displayName}</Paragraph>
            </div>
          );
        })}
      </div>
    </div>
  );
});
