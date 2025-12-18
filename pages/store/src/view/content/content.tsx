import { ProductResultEntity } from '@library/domain';
import { useLoaderData } from '@library/app';

import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content = () => {
  const [result] = useLoaderData<[ProductResultEntity]>();

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
