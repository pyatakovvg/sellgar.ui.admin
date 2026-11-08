import { StoreReviewRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit/table';

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
  const navigate = App.useNavigate();

  return (
    <div className={s.wrapper}>
      <Table
        surface={'standalone'}
        size={'md'}
        data={{ nodes: loaderData.data, getRowId: (row) => row.uuid }}
        layout={{ scroll: 'external', stickyHeader: true, virtualization: true, pinning: { reserve: 50 } }}
        row={{
          handlers: {
            doubleClick: ({ context }) => context.expansion?.toggle(),
            click: ({ row }) => void navigate.to(StoreReviewRoute, { params: { uuid: row.uuid } }),
          },
        }}
      >
        {({ Column, Expand }) => (
          <>
            <Column key={'visible'} width={24} minWidth={24} pinLeft={true}>
              {({ Cell }) => <Cell render={({ row }) => <Visible product={row} />} />}
            </Column>
            <Column key={'name'} minWidth={240} pinLeft={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Товар'} />
                  <Cell render={({ row }) => <Name product={row} />} />
                </>
              )}
            </Column>
            <Column key={'shop'} minWidth={120}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Магазин'} />
                  <Cell render={({ row }) => <Shop product={row} />} />
                </>
              )}
            </Column>
            <Column key={'variants'} width={140}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Варианты'} />
                  <Cell render={({ row }) => <Variants product={row} />} />
                </>
              )}
            </Column>
            <Column key={'showcase'} width={160} minWidth={160} pinRight={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Витрина'} />
                  <Cell render={({ row }) => <Showcase product={row} />} />
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
