import { useLoaderData } from '@library/app';
import { CategoryResultEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content = () => {
  const [data] = useLoaderData<[CategoryResultEntity]>();

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={data.data} />
      </div>
    </div>
  );
};
