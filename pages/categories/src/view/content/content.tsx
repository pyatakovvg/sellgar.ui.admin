import React from 'react';

import { Table } from './table';

import s from './default.module.scss';

export const Content: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <Table />
    </div>
  );
};
