import { StoreModifyFrame } from '@frame/store-modify';
import * as App from '@sellgar/app';
import { Table } from '@sellgar/kit';

import React from 'react';

import { StoreControllerInterface } from '../../classes/controller/store/store-controller.interface.ts';

import { Name } from './name';
import { Shop } from './shop';
import { Showcase } from './showcase';
import { VariantList } from './variant-list';
import { Variants } from './variants';
import { Visible } from './visible';

import s from './default.module.scss';

export const Content: React.FC = () => {
  const loaderData = App.useLoaderData(StoreControllerInterface);
  const storeModifyFrame = App.useFrame(StoreModifyFrame);

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
                <Cell>
                  <Visible />
                </Cell>
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
                  <VariantList storeProduct={row} />
                </div>
              )}
            />
          </>
        )}
      </Table>
    </div>
  );
};
