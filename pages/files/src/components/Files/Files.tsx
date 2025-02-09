import { useQuery } from '@library/app';

import React from 'react';

import { Header } from './Header';
import { Content } from './Content';

import { useFindAllRequest } from '../../hooks/find-all-request.hook.ts';

import s from './default.module.scss';

interface IQuery {
  folderUuid?: string;
}

export const Files = () => {
  const [query] = useQuery<IQuery>();
  const findAllDirsRequest = useFindAllRequest();

  React.useEffect(() => {
    findAllDirsRequest(query.folderUuid);
  }, [query]);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Content />
      </div>
    </div>
  );
};
