import { Heading, Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>Свойства</Heading>
      </div>
      <div className={s.link}>
        <Link href={'/properties/groups/create'}>Добавить группу</Link>
      </div>
      <div className={s.link}>
        <Link href={'/properties/create'}>Добавить свойство</Link>
      </div>
    </div>
  );
};
