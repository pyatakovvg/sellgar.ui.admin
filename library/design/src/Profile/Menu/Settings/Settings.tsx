import { Icon, Link, Paragraph } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Settings: React.FC = () => {
  return (
    <Link className={s.wrapper} href={'/settings'}>
      <div className={s.icon}>
        <Icon icon={'gear'} />
      </div>
      <div className={s.caption}>
        <Paragraph>Настройки</Paragraph>
      </div>
    </Link>
  );
};
