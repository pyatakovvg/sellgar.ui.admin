import { UnitModifyRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { UnitControllerInterface } from '../../../classes/controller/unit/unit-controller.interface.ts';

import { Description } from './description';
import { Name } from './name';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const units = App.useLoaderData(UnitControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: units.data }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(UnitModifyRoute, { params: { uuid: row.uuid } }),
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
