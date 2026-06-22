import { ShopResultEntity } from '@library/domain';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { Table } from './table';
import { ShopControllerInterface } from '../../classes/controller/shop-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const result = useLoaderData(ShopControllerInterface) as ShopResultEntity;

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
