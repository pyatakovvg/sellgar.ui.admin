import { Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Navigate = () => {
  return (
    <div className={s.wrapper}>
      <menu className={s.menu}>
        <div className={s.link}>
          <Link href={'/'}>Главная</Link>
        </div>
        <div className={s.link}>
          <Link href={'/category'}>Категории</Link>
        </div>
        <div className={s.link}>
          <Link href={'/files'}>Файлы</Link>
        </div>
      </menu>
    </div>
  );
};
