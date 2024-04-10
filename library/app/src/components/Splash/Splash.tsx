import React from 'react';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Content } from './Content';
import { Footer } from './Footer';

import { useApp } from '../../hook/useApp.ts';
import { emitter } from '../../application.emitter.ts';

import { APPLICATION_UNAUTHORIZED } from '../../variables.ts';

import s from './default.module.scss';

export const Splash: React.FC = observer(() => {
  const { controller } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    emitter.on('application', (result) => {
      console.log(result);
      if (result) {
        switch (result.type) {
          case APPLICATION_UNAUTHORIZED:
            return navigate('/sign-in');
        }
      }
    });
  }, []);

  if (!controller.initialized) {
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
