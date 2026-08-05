import { useLoaderData } from '@sellgar/app';

import React from 'react';

import { Table } from './table';
import { BrandsControllerInterface } from '../../classes/controller/brand-controller.interface.ts';

export const Content = () => {
  const brand = useLoaderData(BrandsControllerInterface);

  return <Table data={brand.data} />;
};
