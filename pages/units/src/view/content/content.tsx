import { useLoaderData } from '@tiyn/app';
import { UnitResultEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';
import { UnitsControllerInterface } from '../../classes/controller/units-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const result = useLoaderData(UnitsControllerInterface) as UnitResultEntity;

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table data={result.data} />
      </div>
    </div>
  );
};
