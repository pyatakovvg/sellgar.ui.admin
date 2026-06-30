import { Table } from '@sellgar/kit';
import { StoreOfferEntity } from '@library/domain';

import React from 'react';

import { Article } from './article';
import { Name } from './name';
import { Count } from './count';
import { Price } from './price';

import s from './default.module.scss';

interface IProps {
  data: StoreOfferEntity[];
}

export const VariantList: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Table surface={'embedded'} size={'sm'} style={'secondary'} data={{ nodes: props.data }}>
        {({ Column }) => (
          <>
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
            <Column align={'center'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Кол-во'} />
                  <Cell>
                    <Count />
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
          </>
        )}
      </Table>
    </div>
  );
};
