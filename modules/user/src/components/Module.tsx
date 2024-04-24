import { Heading } from '@library/kit';
import { useAuthInterceptor } from '@library/app';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { Content } from './Content';
import { useGetUserByUuid } from '../hooks/useGetUserByUuid.ts';

import s from './default.module.scss';

type IParams = {
  uuid?: string;
};

export const Module = observer(() => {
  const params = useParams<IParams>();
  const getUserByUuid = useGetUserByUuid();

  React.useEffect(() => {
    (async () => {
      if (params.uuid) {
        await getUserByUuid(params.uuid);
      }
    })();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>{params.uuid ? 'Пользователь' : 'Новый пользователь'}</Heading>
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
});
