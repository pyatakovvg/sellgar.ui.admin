import { PropertyModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app-v2/react';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { PropertyControllerInterface } from '../../../classes/controller/property/property-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const properties = App.useLoaderData(PropertyControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: properties.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(PropertyModifyRoute, { params: { uuid: row.uuid } }),
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
