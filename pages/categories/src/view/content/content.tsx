import { useLoaderData } from '@sellgar/app';
import { CategoryResultEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';
import { CategoryControllerInterface } from '../../classes/controller/category-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const data = useLoaderData(CategoryControllerInterface) as CategoryResultEntity;

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={data.data} />
      </div>
    </div>
  );
};
