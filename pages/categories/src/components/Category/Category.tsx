import React from 'react';

import { Proxy } from './Proxy';
import { Header } from './Header';

import { useFindAllRequest } from '../../hooks/find-all-request.hook.ts';

import s from './default.module.scss';

export const Category = () => {
  const findAllRequest = useFindAllRequest();

  React.useEffect(() => {
    findAllRequest();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>
        <Proxy />
      </div>
    </div>
  );
};
