import { Heading } from '@library/kit';

import React from 'react';
import { useParams } from 'react-router-dom';

import { Content } from './Content';

import { useGetDataRequest } from '../../hooks/get-data-category-request.hook.ts';

import s from './default.module.scss';

interface IParams {
  readonly uuid?: string;
}

export const Category = () => {
  const params = useParams() as unknown as IParams;
  const getDataRequest = useGetDataRequest();

  React.useEffect(() => {
    getDataRequest(params?.uuid);
  }, [params]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>{params.uuid ? 'Редактировать' : 'Создать'}</Heading>
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
