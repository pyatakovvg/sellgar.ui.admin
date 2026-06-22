import { Typography } from '@sellgar/kit';
import { useLoaderData } from '@tiyn/app';
import { PropertyGroupEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';
import { Actions } from './actions';
import { PropertyControllerInterface } from '../../classes/controller/property-controller.interface.ts';

import s from './default.module.scss';

export const Content = () => {
  const data = useLoaderData(PropertyControllerInterface) as PropertyGroupEntity[];

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
