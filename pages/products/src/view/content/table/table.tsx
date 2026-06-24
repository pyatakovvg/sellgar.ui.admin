import { ProductEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { useNavigate } from '@tiyn/app';

import React from 'react';

import { Name } from './name';
import { Category } from './category';

import s from './default.module.scss';

interface IProps {
  data: ProductEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: props.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to('/products/' + row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell>
                    <Name />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Категория'} />
                  <Cell>
                    <Category />
                  </Cell>
                </>
              )}
            </Column>
          </>
        )}
      </TableComponent>
    </div>
  );
};
