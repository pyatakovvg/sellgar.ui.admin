import { Heading, Substrate } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import RolesModule from './Roles/role.module.tsx';
import PermissionsModule from './Permission/permission.module.tsx';

import s from './default.module.scss';

export const Module = observer(() => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Настройки</Heading>
      </div>
      <div className={s.content}>
        <div className={s.item}>
          <Substrate>
            <RolesModule />
          </Substrate>
        </div>
        <div className={s.item}>
          <Substrate>
            <PermissionsModule />
          </Substrate>
        </div>
      </div>
    </div>
  );
});
