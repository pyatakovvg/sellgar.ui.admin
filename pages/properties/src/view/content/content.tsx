import { Typography } from '@sellgar/kit';

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
            <Typography size={'body-s'} weight={'semi-bold'}>
              <p>{group.name}</p>
            </Typography>
          </div>
          <div className={s.actions}>
            <Actions data={group} />
          </div>
        </div>
        <div className={s.description}>
          <Typography size={'caption-m'}>
            <p>{group.description}</p>
          </Typography>
        </div>
        <div className={s.table}>
          <Table data={group.properties} />
        </div>
      </div>
    );
  });
};
