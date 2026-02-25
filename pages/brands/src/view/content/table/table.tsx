import { BrandEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { Name } from './name';
import { Info } from './info';
import { Actions } from './actions';

interface IProps {
  data: BrandEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <TableComponent data={{ nodes: props.data }} useInternalScroll={false} select={{ isUse: true, onSelect: () => {} }}>
      <TableComponent.Column width={600}>
        <TableComponent.Head label={'Наименование'} />
        <TableComponent.Cell>
          <Name />
        </TableComponent.Cell>
      </TableComponent.Column>
      <TableComponent.Column>
        <TableComponent.Head label={'Описание'} />
        <TableComponent.Cell>
          <Info />
        </TableComponent.Cell>
      </TableComponent.Column>
      <TableComponent.Column width={60}>
        <TableComponent.Cell>
          <Actions />
        </TableComponent.Cell>
      </TableComponent.Column>
    </TableComponent>
  );
};
