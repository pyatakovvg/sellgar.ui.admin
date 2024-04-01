import { Heading, Icon, Paragraph } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';

import { User, type IUser } from './User';
import { context } from '../users.context.ts';

import s from './default.module.scss';

export const UsersView = observer(() => {
  const navigate = useNavigate();
  const { controller } = React.useContext(context);

  React.useEffect(() => {
    controller.getData();
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
        <div className={s.aside}>
          <Paragraph>Всего {controller.users.meta.totalRows}</Paragraph>
        </div>
        <div className={s.list}>
          {controller.users.data.map((user: IUser) => {
            return (
              <div key={user.uuid} className={s.item}>
                <User user={user} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={s.control}>
        <div className={s.button} onClick={handleCreateUser}>
          <Icon icon={'plus'} />
        </div>
      </div>
    </div>
  );
});
