import { useLoaderData } from '@library/app';
import { BrandResultEntity } from '@library/domain';

import React from 'react';

import { Table } from './table';

export const Content = () => {
  const [brand] = useLoaderData<[BrandResultEntity]>();

  return <Table data={brand.data} />;
};
