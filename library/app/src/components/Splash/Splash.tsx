import React from 'react';
import { observer } from 'mobx-react';

import { Content } from './Content';
import { Footer } from './Footer';

import { useApp } from '../../hook/useApp.ts';

import s from './default.module.scss';
import { Outlet } from 'react-router-dom';

export const Splash: React.FC = observer(() => {
  const { appController } = useApp();

  if (!appController.initialized) {
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
  }

  return <Outlet />;
});
