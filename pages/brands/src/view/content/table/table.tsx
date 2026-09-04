import { BrandModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { BrandControllerInterface } from '../../../classes/controller/brand/brand-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const brands = App.useLoaderData(BrandControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'md'}
        data={{ nodes: brands.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(BrandModifyRoute, { params: { uuid: row.uuid } }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Наименование'} />
                  <Cell>
                    <Name />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell>
                    <Description />
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
