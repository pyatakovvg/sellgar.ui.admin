import { Typography } from '@sellgar/kit';
import React from 'react';

import s from './default.module.scss';

interface Props {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const Section: React.FC<Props> = (props) => (
  <section className={s.wrapper}>
    <header className={s.header}>
      <Typography size={'body-m'} weight={'medium'}>
        <h3>{props.title}</h3>
      </Typography>
      {props.actions}
    </header>
    <div className={s.content}>{props.children}</div>
  </section>
);
