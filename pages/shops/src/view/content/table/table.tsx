import { ShopModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { ShopControllerInterface } from '../../../classes/controller/shop/shop-controller.interface.ts';

import { Name } from './name';
import { Inn } from './inn';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const shops = App.useLoaderData(ShopControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: shops.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(ShopModifyRoute, { params: { uuid: row.uuid } }),
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
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'ИНН'} />
                  <Cell>
                    <Inn />
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
