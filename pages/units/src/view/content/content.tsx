import { useLoaderData } from '@library/app';
import { UnitResultEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content = () => {
  const [result] = useLoaderData<[UnitResultEntity]>();

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
