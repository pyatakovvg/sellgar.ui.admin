import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit/table';
import React from 'react';
import { Name } from './name';
import { Price } from './price';
import { Visible } from './visible';
import { RecordList } from './record-list';
import s from './default.module.css';

interface IProps {
  storeProduct: StoreProductEntity;
}
const VariantListComponent: React.FC<IProps> = (props) => {
  const revalidate = App.useRevalidate();

  return (
    <div className={s.wrapper}>
      <Table
        loading={revalidate.inProcess}
        surface={'embedded'}
        size={'sm'}
        style={'secondary'}
        data={{ nodes: props.storeProduct.offers }}
        layout={{ stickyHeader: false }}
        row={{ handlers: { doubleClick: ({ context }) => context.expansion?.toggle() } }}
      >
        {({ Column, Expand }) => (
          <>
            <Column width={'var(--numbers-36)'}>
              {({ Cell }) => <Cell render={({ row }) => <Visible offer={row} />} />}
            </Column>
            <Column minWidth={'var(--numbers-160)'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Вариант'} />
                  <Cell render={({ row }) => <Name offer={row} />} />
                </>
              )}
            </Column>
            <Column minWidth={'var(--numbers-160)'} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Цена'} />
                  <Cell render={({ row }) => <Price offer={row} />} />
                </>
              )}
            </Column>
            <Expand render={({ row }) => <RecordList offer={row} />} />
          </>
        )}
      </Table>
    </div>
  );
};

export const VariantList = App.reactive(VariantListComponent);
