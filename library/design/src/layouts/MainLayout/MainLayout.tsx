import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';

import s from './default.module.scss';

export const MainLayout: React.FC<React.PropsWithChildren> = () => {
  return (
    <section className={s.wrapper}>
      <header className={s.header}>
        <Header />
      </header>
      <section className={s.container}>
        <div className={s.content}>
          <Outlet />
        </div>
      </section>
      <footer className={s.footer}>
        <Footer />
      </footer>
    </section>
  );
};
