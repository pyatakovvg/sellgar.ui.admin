import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app-v2/react';
import { Table } from '@sellgar/kit';

import React from 'react';

import { Article } from './article';
import { Actions } from './actions';
import { Inventory } from './inventory';
import { Name } from './name';
import { Price } from './price';
import { Visible } from './visible';

import s from './default.module.scss';

interface VariantListProps {
  storeProduct: StoreProductEntity;
}

const VariantListComponent: React.FC<VariantListProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Table surface={'embedded'} size={'sm'} style={'secondary'} data={{ nodes: props.storeProduct.offers }}>
        {({ Column }) => (
          <>
            <Column width={36}>
              {({ Cell }) => (
                <Cell>
                  <Visible />
                </Cell>
              )}
            </Column>
            <Column width={200}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Артикул'} />
                  <Cell>
                    <Article />
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
            <Column width={96} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Остаток'} />
                  <Cell>
                    <Inventory value={'quantity'} />
                  </Cell>
                </>
              )}
            </Column>
            <Column width={96} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Резерв'} />
                  <Cell>
                    <Inventory value={'reserved'} />
                  </Cell>
                </>
              )}
            </Column>
            <Column width={96} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Доступно'} />
                  <Cell>
                    <Inventory value={'available'} />
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
            <Column width={52} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={''} />
                  <Cell>
                    <Actions storeProductUuid={props.storeProduct.uuid} />
                  </Cell>
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};

export const VariantList = App.reactive(VariantListComponent);
