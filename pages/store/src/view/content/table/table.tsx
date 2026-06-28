import { StoreProductEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { StoreModifyFrame } from '@frame/store-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import { Article } from './article';
import { Name } from './name';
import { Shop } from './shop';
import { Category } from './category';
import { Count } from './count';
import { Price } from './price';

import s from './default.module.scss';

interface IProps {
  data: StoreProductEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const storeModifyFrame = useFrame(StoreModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: props.data }}
        row={{
          handlers: {
            click: ({ row }) => void storeModifyFrame.open({ uuid: row.uuid }),
          },
        }}
      >
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
            <Column>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Статус'} />
                  <Cell>
                    <Category />
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
      </TableComponent>
    </div>
  );
};
