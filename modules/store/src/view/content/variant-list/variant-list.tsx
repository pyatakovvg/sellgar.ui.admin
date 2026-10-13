import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit';
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
      row={{ handlers: { doubleClick: ({ context }) => context.expansion?.toggle() } }}
    >
      {({ Column, Expand }) => (
        <>
          <Column width={36}>
            {({ Cell }) => (
              <Cell>
                <Visible />
              </Cell>
            )}
          </Column>
          <Column>
            {({ Head, Cell }) => (
              <>
                <Head label={'Вариант'} />
                <Cell>
                  <Name />
                </Cell>
              </>
            )}
          </Column>
          <Column align={'right'}>
            {({ Head, Cell }) => (
              <>
                <Head label={'Цена'} />
                <Cell>
                  <Price />
                </Cell>
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
