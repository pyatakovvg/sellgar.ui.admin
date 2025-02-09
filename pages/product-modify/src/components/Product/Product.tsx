import { Heading } from '@library/kit';

import React from 'react';

import { Content } from './Content';

import { useGetParams } from '../../hooks/get-params.hook.ts';
import { usePropertiesRequest } from '../../hooks/find-properties-request.hook.ts';

import s from './default.module.scss';

export const Product = () => {
  const params = useGetParams();
  const findPropertiesRequest = usePropertiesRequest();

  React.useEffect(() => {
    findPropertiesRequest();
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
