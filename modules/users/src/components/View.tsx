import { useAuthInterceptor } from '@library/app';
import { Heading, Icon, Paragraph } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { Content } from './Content';

import { context } from '../users.context.ts';

import s from './default.module.scss';

export const UsersView = observer(() => {
  const navigate = useNavigate();
  const { presenter } = React.useContext(context);

  const interceptor = useAuthInterceptor(async () => {
    await presenter.getData();
  });

  React.useEffect(() => {
    interceptor.intercept();
  }, []);

  const handleCreateUser = () => {
    navigate('/users/create');
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Пользователи</Heading>
      </div>
      <div className={s.content}>
        <Content />
      </div>
      <div className={s.control}>
        <div className={s.button} onClick={handleCreateUser}>
          <Icon icon={'plus'} />
        </div>
      </div>
    </div>
  );
});
