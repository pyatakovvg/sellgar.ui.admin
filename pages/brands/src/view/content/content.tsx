import { useLoaderData } from '@library/app';
import { BrandResultEntity } from '@library/domain';
import { Caption } from '@sellgar/kit';

import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content = () => {
  const [brand] = useLoaderData<[BrandResultEntity]>();

  return <Table data={brand.data} />;
};
