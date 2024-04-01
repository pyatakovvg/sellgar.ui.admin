import { Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Link href={'/'}>
          <span className={s.logo} />
        </Link>
      </div>
    </div>
  );
};
