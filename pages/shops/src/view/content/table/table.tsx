import { ShopModifyFrame } from '@frame/shop-modify';
import * as App from '@sellgar/app';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { ShopControllerInterface } from '../../../classes/controller/shop/shop-controller.interface.ts';

import { Name } from './name';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const shops = App.useLoaderData(ShopControllerInterface);
  const shopModifyFrame = App.useFrame(ShopModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: shops.data }}
        row={{
          handlers: {
            click: ({ row }) => void shopModifyFrame.open({ uuid: row.uuid }),
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
