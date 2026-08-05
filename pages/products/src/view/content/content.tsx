import { ProductResultEntity } from '@library/domain';
import { useLoaderData } from '@sellgar/app';

import React from 'react';

import { Table } from './table';
import { ProductsControllerInterface } from '../../classes/controller/products-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const result = useLoaderData(ProductsControllerInterface) as ProductResultEntity;

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
