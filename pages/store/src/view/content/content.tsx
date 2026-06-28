import { StoreProductResultEntity } from '@library/domain';
import { useLoaderData } from '@tiyn/app';

import React from 'react';

import { Table } from './table';
import { StoreControllerInterface } from '../../classes/controller/store-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const result = useLoaderData(StoreControllerInterface) as StoreProductResultEntity;

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
