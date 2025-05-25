import React from 'react';

import { Table } from './table';

import { useGetData } from '../../hooks/get-data.hook.ts';

import s from './default.module.scss';

export const Content = () => {
  const data = useGetData();

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={data} />
      </div>
    </div>
  );
};
