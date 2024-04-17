import { useApp } from '@library/app';
import { Icon, Paragraph } from '@library/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './default.module.scss';

export const SignOut: React.FC = () => {
  const app = useApp();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await app.presenter.signOut();
    app.profile.resetProfile();

    navigate('/sign-in');
  };

  return (
    <div className={s.wrapper} onClick={handleSignOut}>
      <div className={s.icon}>
        <Icon icon={'right-from-bracket'} />
      </div>
      <div className={s.caption}>
        <Paragraph>Выйти</Paragraph>
      </div>
    </div>
  );
};
