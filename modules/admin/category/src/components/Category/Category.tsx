import { Heading } from '@library/kit';

import React from 'react';
import { useParams } from 'react-router-dom';

import { Content } from './Content';

import { useFindAllCategoriesRequest } from '../../hooks/find-all-categories-request.hook.ts';
import { useFindByUuidCategoryRequest } from '../../hooks/find-by-uuid-categories-request.hook.ts';

import s from './default.module.scss';

interface IParams {
  readonly uuid: string;
}

export const Category = () => {
  const params = useParams() as unknown as IParams;
  const findAllCategoriesRequest = useFindAllCategoriesRequest();
  const findByUuidCategoryRequest = useFindByUuidCategoryRequest();

  React.useEffect(() => {
    if (params.uuid) {
      findByUuidCategoryRequest(params.uuid);
    }
    findAllCategoriesRequest();
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
