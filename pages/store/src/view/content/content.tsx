import { Table } from '@sellgar/kit';
import { StoreModifyFrame } from '@frame/store-modify';
import { useFrame, useLoaderData } from '@tiyn/app';

import React from 'react';

import { Name } from './name';
import { Shop } from './shop';
import { Variants } from './variants';
import { Showcase } from './showcase';
import { Visible } from './visible';
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
            <Column width={24}>
              {({ Cell }) => (
                <>
                  <Cell>
                    <Visible />
                  </Cell>
                </>
              )}
            </Column>
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
                  <Head label={'Магазин'} />
                  <Cell>
                    <Shop />
                  </Cell>
                </>
              )}
            </Column>
            <Column width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Варианты'} />
                  <Cell>
                    <Variants />
                  </Cell>
                </>
              )}
            </Column>
            <Column width={160}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Витрина'} />
                  <Cell>
                    <Showcase />
                  </Cell>
                </>
              )}
            </Column>

            <Expand
              render={({ row }) => (
                <div className={s.variants}>
                  <VariantList storeProduct={row} data={row.offers} />
                </div>
              )}
            />
          </>
        )}
      </Table>
    </div>
  );
};
