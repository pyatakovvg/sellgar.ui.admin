import { PropertyModifyFrame } from '@frame/property-modify';
import * as App from '@sellgar/app';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { PropertyControllerInterface } from '../../../classes/controller/property/property-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const properties = App.useLoaderData(PropertyControllerInterface);
  const propertyModifyFrame = App.useFrame(PropertyModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: properties.data }}
        row={{
          handlers: {
            click: ({ row }) => void propertyModifyFrame.open({ uuid: row.uuid }),
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
