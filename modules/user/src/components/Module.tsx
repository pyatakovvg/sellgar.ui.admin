import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { Content } from './Content';

import { useGetData } from '@/hooks/useGetData.ts';

import s from './default.module.scss';

type IParams = {
  uuid?: string;
};

export const Module = observer(() => {
  const params = useParams<IParams>();
  const getData = useGetData();

  React.useEffect(() => {
    (async () => {
      await getData(params.uuid);
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
