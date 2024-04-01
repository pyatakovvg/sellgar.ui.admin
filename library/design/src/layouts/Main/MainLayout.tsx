import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

import s from './default.module.scss';

export const MainLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <section className={s.wrapper}>
      <header className={s.header}>
        <Header />
      </header>
      <section className={s.container}>
        <div className={s.content}>{props.children}</div>
      </section>
      <footer className={s.footer}>
        <Footer />
      </footer>
    </section>
  );
};
