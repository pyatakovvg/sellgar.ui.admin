import { Heading, Paragraph } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../role.context.ts';

import s from './default.module.scss';

export const Roles = observer(() => {
  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    presenter.getAll();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h3'}>Роль</Heading>
      </div>
      <div className={s.content}>
        {presenter.roles.map((role) => {
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
