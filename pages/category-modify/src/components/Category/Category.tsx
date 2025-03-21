import { Typography } from '@sellgar/kit';

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
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>{params.uuid ? 'Редактировать' : 'Создать'}</h6>
        </Typography>
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
