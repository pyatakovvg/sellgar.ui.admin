import { ShopEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { ShopModifyFrame } from '@frame/shop-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import { Name } from './name';

import s from './default.module.scss';

interface IProps {
  data: ShopEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const frame = useFrame(ShopModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: props.data }}
        row={{
          handlers: {
            click: ({ row }) => void frame.open({ uuid: row.uuid }),
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
