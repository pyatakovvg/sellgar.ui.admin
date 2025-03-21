import { Typography } from '@sellgar/kit';

import React from 'react';
import { useParams } from 'react-router-dom';

import { Content } from './Content';

import { useFindBrandByCodeRequest } from '../../hooks/find-brand-by-code-request.hook.ts';

import s from './default.module.scss';

interface IParams {
  readonly uuid?: string;
}

export const Property = () => {
  const params = useParams() as unknown as IParams;
  const findBrandByCodeRequest = useFindBrandByCodeRequest();

  React.useEffect(() => {
    findBrandByCodeRequest(params?.uuid);
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
