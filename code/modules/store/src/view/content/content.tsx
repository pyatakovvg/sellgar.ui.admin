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

import s from './default.module.css';

export const Content: React.FC = () => {
  const loaderData = App.useLoaderData(StoreControllerInterface);
  const navigate = App.useNavigate();
  const revalidate = App.useRevalidate();

  return (
    <div className={s.wrapper}>
      <Table
        loading={revalidate.inProcess}
        surface={'standalone'}
        size={'md'}
        data={{ nodes: loaderData.data }}
        row={{
          handlers: {
            doubleClick: ({ context }) => context.expansion?.toggle(),
            click: ({ row }) => void navigate.to(StoreReviewRoute, { params: { uuid: row.uuid } }),
          },
        }}
      >
        {({ Column, Expand }) => (
          <>
            <Column width={'var(--numbers-24)'} minWidth={'var(--numbers-24)'} pinLeft={true}>
              {({ Cell }) => <Cell render={({ row }) => <Visible product={row} />} />}
            </Column>
            <Column minWidth={'var(--numbers-240)'} pinLeft={true} resizable={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Товар'} />
                  <Cell render={({ row }) => <Name product={row} />} />
                </>
              )}
            </Column>
            <Column minWidth={'var(--numbers-120)'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Магазин'} />
                  <Cell render={({ row }) => <Shop product={row} />} />
                </>
              )}
            </Column>
            <Column width={'var(--numbers-140)'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Варианты'} />
                  <Cell render={({ row }) => <Variants product={row} />} />
                </>
              )}
            </Column>
            <Column width={'var(--numbers-160)'} minWidth={'var(--numbers-160)'} pinRight={true} resizable={true}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Витрина'} />
                  <Cell render={({ row }) => <Showcase product={row} />} />
                </>
              )}
            </Column>

            <Expand render={({ row }) => <VariantList storeProduct={row} />} />
          </>
        )}
      </Table>
    </div>
  );
};
