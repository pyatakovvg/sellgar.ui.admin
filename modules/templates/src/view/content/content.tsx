import type { ProductTypeEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import * as Kit from '@sellgar/kit';
import { Table as TableComponent, Typography } from '@sellgar/kit';

import React from 'react';

import { TemplatesControllerInterface } from '../../classes/controller/templates-controller.interface.ts';

import s from './content.module.scss';

const NameCell: React.FC = App.reactive(() => {
  const { data } = Kit.useCellData<ProductTypeEntity>();
  return (
    <div className={s.cell}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{data.name}</p>
      </Typography>
    </div>
  );
});

const ActiveProductCountCell: React.FC = App.reactive(() => {
  const { data } = Kit.useCellData<ProductTypeEntity>();
  return <div className={s.cell}>{data.activeProductCount}</div>;
});

const ArchivedProductCountCell: React.FC = App.reactive(() => {
  const { data } = Kit.useCellData<ProductTypeEntity>();
  return <div className={s.cell}>{data.archivedProductCount}</div>;
});

export const Content: React.FC = () => {
  const controller = App.useController(TemplatesControllerInterface);
  const templates = App.useLoaderData(TemplatesControllerInterface);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: templates.items }}
        row={{ handlers: { click: ({ row }) => void controller.open(row.uuid) } }}
      >
        {({ Column }) => (
          <>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Название'} />
                  <Cell>
                    <NameCell />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Активные товары'} />
                  <Cell>
                    <ActiveProductCountCell />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Архивные товары'} />
                  <Cell>
                    <ArchivedProductCountCell />
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
