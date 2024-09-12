import { HomeModule } from '@module/home';

import React from 'react';

import s from './page.module.scss';

export default function Home() {
  return (
    <main className={s.main}>
      <HomeModule />
    </main>
  );
}
