import { useLoaderData } from '@library/app';
import { BrandResultEntity } from '@library/domain';
import { Caption } from '@sellgar/kit';

import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content = () => {
  const [brand] = useLoaderData<[BrandResultEntity]>();

  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <div className={s.content}>
          <Table data={brand.data} />
        </div>
        <div className={s.footer}>
          <Caption caption={`Всего записей: ${brand.meta.totalRows}`} />
        </div>
      </div>
    </div>
  );
};
