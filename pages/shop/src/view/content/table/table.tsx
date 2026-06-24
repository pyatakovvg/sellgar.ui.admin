import { ShopEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { useNavigate } from '@tiyn/app';

import React from 'react';

import { Name } from './name';

import s from './default.module.scss';

interface IProps {
  data: ShopEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: props.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to('/shop/' + row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Название'} />
                  <Cell>
                    <Name />
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
