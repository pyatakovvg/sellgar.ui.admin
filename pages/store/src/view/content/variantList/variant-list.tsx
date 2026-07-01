import { Dot, Table } from '@sellgar/kit';
import { StoreOfferEntity, StoreProductEntity } from '@library/domain';

import React from 'react';

import { Article } from './article';
import { Name } from './name';
import { Inventory } from './inventory';
import { Price } from './price';
import { Actions } from './actions';
import { Visible } from './visible';

import s from './default.module.scss';

interface IProps {
  storeProduct: StoreProductEntity;
  data: StoreOfferEntity[];
}

export const VariantList: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Table surface={'embedded'} size={'sm'} style={'secondary'} data={{ nodes: props.data }}>
        {({ Column }) => (
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
                    <Actions storeProduct={props.storeProduct} />
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
