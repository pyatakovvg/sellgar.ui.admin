import { Heading } from '@library/kit';

import React from 'react';

import { Proxy } from './Proxy';

import { useFindAllRequest } from '../../hooks/find-all-request-request.hook.ts';

import s from './default.module.scss';

export const Category = () => {
  const findAllRequest = useFindAllRequest();

  React.useEffect(() => {
    findAllRequest();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>Категории</Heading>
      </div>
      <div className={s.content}>
        <Proxy />
      </div>
    </div>
  );
};
