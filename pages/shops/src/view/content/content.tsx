import { ShopResultEntity } from '@library/domain';
import { useLoaderData } from '@sellgar/app';

import React from 'react';

import { Table } from './table';
import { ShopsControllerInterface } from '../../classes/controller/shops-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const result = useLoaderData(ShopsControllerInterface) as ShopResultEntity;

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
