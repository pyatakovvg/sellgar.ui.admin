import { useApp } from '@library/app';
import { DropDownContext, Icon, Paragraph } from '@library/kit';

import React from 'react';
import { useNavigate } from 'react-router-dom';

import s from './default.module.scss';

export const SignOut: React.FC = () => {
  const app = useApp();
  const navigate = useNavigate();

  const context = React.useContext(DropDownContext);

  const handleSignOut = async () => {
    await app.presenter.signOut();

    navigate('/sign-in');
    context.close();
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
