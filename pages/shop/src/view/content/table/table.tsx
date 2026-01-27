import { ShopEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { Name } from './name';
import { Actions } from './actions';

import s from './default.module.scss';

interface IProps {
  data: ShopEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <TableComponent data={props.data}>
        <TableComponent.Column>
          <TableComponent.Head label={'Название'} />
          <TableComponent.Cell>
            <Name />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column width={80}>
          <TableComponent.Cell>
            <Actions />
          </TableComponent.Cell>
        </TableComponent.Column>
      </TableComponent>
    </div>
  );
};
