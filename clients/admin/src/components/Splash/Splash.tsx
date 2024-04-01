import React from 'react';

import { Content } from './Content';
import { Footer } from './Footer';

import s from './default.module.scss';

export const Splash: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Content />
      </div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  );
};
