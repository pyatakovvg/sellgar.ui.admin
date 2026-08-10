import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.table}>
        <Table />
      </div>
    </div>
  );
};
