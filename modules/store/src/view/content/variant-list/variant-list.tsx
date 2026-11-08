import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit/table';
import React from 'react';
import { Name } from './name';
import { Price } from './price';
import { Visible } from './visible';
import { RecordList } from './record-list';
import s from './default.module.scss';

interface IProps {
  storeProduct: StoreProductEntity;
}
const VariantListComponent: React.FC<IProps> = (props) => (
  <div className={s.wrapper}>
    <Table
      surface={'embedded'}
      size={'sm'}
      style={'secondary'}
      data={{ nodes: props.storeProduct.offers }}
      layout={{ scroll: 'external', stickyHeader: false, virtualization: true }}
      row={{ handlers: { doubleClick: ({ context }) => context.expansion?.toggle() } }}
    >
      {({ Column, Expand }) => (
        <>
          <Column key={'visible'} width={'var(--numbers-36)'}>
            {({ Cell }) => <Cell render={({ row }) => <Visible offer={row} />} />}
          </Column>
          <Column key={'name'} minWidth={'var(--numbers-160)'}>
            {({ Head, Cell }) => (
              <>
                <Head label={'Вариант'} />
                <Cell render={({ row }) => <Name offer={row} />} />
              </>
            )}
          </Column>
          <Column key={'price'} minWidth={'var(--numbers-160)'} align={'right'}>
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
export const VariantList = App.reactive(VariantListComponent);
