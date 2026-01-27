import { ProductEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { Article } from './article';
import { Name } from './name';
import { Shop } from './shop';
import { Actions } from './actions';
import { Category } from './category';
import { Count } from './count';
import { Price } from './price';

import s from './default.module.scss';

interface IProps {
  data: ProductEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <TableComponent data={props.data} select={{ isUse: true, onChange: () => {} }}>
        <TableComponent.Column>
          <TableComponent.Head label={'Артикул'} />
          <TableComponent.Cell>
            <Article />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column>
          <TableComponent.Head label={'Описание'} />
          <TableComponent.Cell>
            <Name />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column>
          <TableComponent.Head label={'Категория'} />
          <TableComponent.Cell>
            <Category />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column>
          <TableComponent.Head label={'Магазин'} />
          <TableComponent.Cell>
            <Shop />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column align={'center'}>
          <TableComponent.Head label={'Кол-во'} />
          <TableComponent.Cell>
            <Count />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column align={'right'}>
          <TableComponent.Head label={'Цена'} />
          <TableComponent.Cell>
            <Price />
          </TableComponent.Cell>
        </TableComponent.Column>
        <TableComponent.Column width={60} pinRight>
          <TableComponent.Cell>
            <Actions />
          </TableComponent.Cell>
        </TableComponent.Column>
      </TableComponent>
    </div>
  );
};
