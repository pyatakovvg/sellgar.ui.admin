import { Heading, Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>Бренд</Heading>
      </div>
      <div>
        <Link href={'/brands/create'}>Добавить бренд</Link>
      </div>
    </div>
  );
};
