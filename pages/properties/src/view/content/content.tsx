import { Heading } from '@library/kit';

import React from 'react';

import { Table } from './table';
import { Actions } from './actions';

import { useGetData } from '../../hooks/get-data.hook.ts';

import s from './default.module.scss';

export const Content = () => {
  const data = useGetData();

  return data.map((group) => {
    return (
      <div key={group.uuid} className={s.wrapper}>
        <div className={s.header}>
          <div className={s.title}>
            <Heading variant={'H5'}>{group.name}</Heading>
          </div>
          <div className={s.actions}>
            <Actions data={group} />
          </div>
        </div>
        <div className={s.table}>
          <Table data={group.properties} />
        </div>
      </div>
    );
  });
};
