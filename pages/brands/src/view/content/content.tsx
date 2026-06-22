import { useLoaderData } from '@tiyn/app';
import { BrandResultEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';
import { BrandsControllerInterface } from '../../classes/controller/brand-controller.interface.ts';

export const Content = () => {
  const brand = useLoaderData(BrandsControllerInterface) as BrandResultEntity;

  return <Table data={brand.data} />;
};
