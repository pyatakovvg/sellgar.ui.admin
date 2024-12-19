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
          <Link href={'/brands'}>Бренды</Link>
        </div>
        <div className={s.link}>
          <Link href={'/categories'}>Категории</Link>
        </div>
        <div className={s.link}>
          <Link href={'/units'}>Единица измерения</Link>
        </div>
        <div className={s.link}>
          <Link href={'/properties'}>Свойства</Link>
        </div>
        <div className={s.link}>
          <Link href={'/products'}>Товары</Link>
        </div>
        <div className={s.link}>
          <Link href={'/files'}>Файлы</Link>
        </div>
      </menu>
    </div>
  );
};
