import { Table } from '@sellgar/kit';
import { StoreModifyFrame } from '@frame/store-modify';
import { useFrame, useLoaderData } from '@tiyn/app';

import React from 'react';

import { Name } from './name';
import { Shop } from './shop';
import { Category } from './category';
import { VariantList } from './variantList';

import { StoreControllerInterface } from '../../classes/controller/store-controller.interface.ts';

import s from './default.module.scss';

export const Content: React.FC = () => {
  const loaderData = useLoaderData(StoreControllerInterface);
  const storeModifyFrame = useFrame(StoreModifyFrame);

  return (
    <div className={s.wrapper}>
      <Table
        size={'md'}
        data={{ nodes: loaderData.data }}
        row={{
          handlers: {
            click: ({ row }) => void storeModifyFrame.open({ uuid: row.uuid }),
            doubleClick: ({ context }) => context.expansion?.toggle(),
          },
        }}
      >
        {({ Column, Expand }) => (
          <>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Описание'} />
                  <Cell>
                    <Name />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Статус'} />
                  <Cell>
                    <Category />
                  </Cell>
                </>
              )}
            </Column>
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Магазин'} />
                  <Cell>
                    <Shop />
                  </Cell>
                </>
              )}
            </Column>

            <Expand render={({ row }) => <VariantList data={row.offers} />} />
          </>
        )}
      </Table>
    </div>
  );
};
