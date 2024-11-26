import { Heading } from '@library/kit';
import { useQuery } from '@library/app';

import React from 'react';

import { Content } from './Content';

import { useFindAllRequest } from '../../hooks/find-all-request.hook.ts';

import s from './default.module.scss';

interface IQuery {
  dirUuid?: string;
}

export const Files = () => {
  const [query] = useQuery<IQuery>();
  const findAllDirsRequest = useFindAllRequest();

  React.useEffect(() => {
    findAllDirsRequest(query.dirUuid);
  }, [query]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>Файлы</Heading>
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
