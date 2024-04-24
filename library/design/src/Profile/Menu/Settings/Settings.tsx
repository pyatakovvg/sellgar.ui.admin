import { Icon, Link, Paragraph, DropDownContext } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Settings: React.FC = () => {
  const context = React.useContext(DropDownContext);

  return (
    <Link className={s.wrapper} href={'/settings'} onClick={() => context.close()}>
      <div className={s.icon}>
        <Icon icon={'gear'} />
      </div>
      <div className={s.caption}>
        <Paragraph>Настройки</Paragraph>
      </div>
    </Link>
  );
};
