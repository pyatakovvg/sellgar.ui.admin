import { UnitReviewRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { UnitControllerInterface } from '../../../classes/controller/unit/unit-controller.interface.ts';

import { Symbol } from './symbol';
import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = App.reactive(() => {
  const units = App.useLoaderData(UnitControllerInterface);
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: units.items }}
        row={{
          handlers: {
            click: ({ row }) => void navigate.to(UnitReviewRoute, { params: { code: row.code } }),
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
                  <Head label={'Обозначение'} />
                  <Cell>
                    <Symbol />
                  </Cell>
                </>
              )}
            </Column>
            <Column width={'minmax(0, 1fr)'}>
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
});
