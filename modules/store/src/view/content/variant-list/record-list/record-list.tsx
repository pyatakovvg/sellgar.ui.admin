import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit/table';
import React from 'react';
import { Article } from './article';
import { Clarifications } from './clarifications';
import { Inventory } from './inventory';
import { Actions } from './actions';
import { RecordListContext } from './record-list.context.ts';
import s from './default.module.scss';

interface IProps {
  offer: StoreOfferEntity;
}
const RecordListComponent: React.FC<IProps> = (props) => {
  const revalidate = App.useRevalidate();

  return (
    <RecordListContext.Provider value={props.offer}>
      <div className={s.wrapper}>
        <Table
          loading={revalidate.inProcess}
          surface={'embedded'}
          size={'sm'}
          style={'secondary'}
          data={{ nodes: props.offer.records }}
          layout={{ stickyHeader: false }}
        >
          {({ Column }) => (
            <>
              <Column width={'var(--numbers-220)'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Артикул'} />
                    <Cell render={({ row }) => <Article record={row} />} />
                  </>
                )}
              </Column>
              <Column minWidth={'var(--numbers-140)'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Уточнения'} />
                    <Cell render={({ row }) => <Clarifications record={row} />} />
                  </>
                )}
              </Column>
              <Column width={'var(--numbers-96)'} align={'right'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Остаток'} />
                    <Cell render={({ row }) => <Inventory record={row} value={'quantity'} />} />
                  </>
                )}
              </Column>
              <Column width={'var(--numbers-96)'} align={'right'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Резерв'} />
                    <Cell render={({ row }) => <Inventory record={row} value={'reserved'} />} />
                  </>
                )}
              </Column>
              <Column width={'var(--numbers-96)'} align={'right'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Доступно'} />
                    <Cell render={({ row }) => <Inventory record={row} value={'available'} />} />
                  </>
                )}
              </Column>
              <Column width={'var(--numbers-52)'}>
                {({ Cell }) => <Cell render={({ row }) => <Actions record={row} />} />}
              </Column>
            </>
          )}
        </Table>
      </div>
    </RecordListContext.Provider>
  );
};
export const RecordList = App.reactive(RecordListComponent);
