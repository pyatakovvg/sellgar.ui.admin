import { BrandModifyFrame } from '@frame/brand-modify';
import * as App from '@sellgar/app';
import { Table as TableComponent } from '@sellgar/kit';

import React from 'react';

import { BrandsControllerInterface } from '../../../classes/controller/brand-controller.interface.ts';

import { Name } from './name';
import { Description } from './description';

import s from './default.module.scss';

export const Table: React.FC = () => {
  const brands = App.useLoaderData(BrandsControllerInterface);
  const brandModifyFrame = App.useFrame(BrandModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        size={'md'}
        data={{ nodes: brands.data }}
        row={{
          handlers: {
            click: ({ row }) => void brandModifyFrame.open({ uuid: row.uuid }),
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
