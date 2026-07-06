import { useLoaderData } from '@tiyn/app';
import { PropertyEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';
import { PropertyControllerInterface } from '../../classes/controller/property-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const data = useLoaderData(PropertyControllerInterface) as PropertyEntity[];

  return (
    <div className={s.wrapper}>
      <Table data={data} />
    </div>
  );
};
