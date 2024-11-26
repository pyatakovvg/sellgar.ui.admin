import { Button } from '@library/kit';

import React from 'react';
import { NavLink } from 'react-router-dom';

import { Table } from './Table';

import { useGetData } from '../../../../hooks/get-data.hook.ts';

import s from './default.module.scss';

export const Content = () => {
  const data = useGetData();

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={data} />
      </div>
      <NavLink to={'/category/create'}>
        <Button>Создать</Button>
      </NavLink>
    </div>
  );
};
