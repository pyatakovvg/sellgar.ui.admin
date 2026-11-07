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
  return (
    <RecordListContext.Provider value={props.offer}>
      <div className={s.wrapper}>
        <Table
          surface={'embedded'}
          size={'sm'}
          style={'secondary'}
          data={{ nodes: props.offer.records, getRowId: (row) => row.uuid }}
          layout={{ scroll: 'external', stickyHeader: false, virtualization: true }}
        >
          {({ Column }) => (
            <>
              <Column key={'article'} width={220}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Артикул'} />
                    <Cell render={({ row }) => <Article record={row} />} />
                  </>
                )}
              </Column>
              <Column key={'clarifications'} minWidth={140}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Уточнения'} />
                    <Cell render={({ row }) => <Clarifications record={row} />} />
                  </>
                )}
              </Column>
              <Column key={'quantity'} width={96} align={'right'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Остаток'} />
                    <Cell render={({ row }) => <Inventory record={row} value={'quantity'} />} />
                  </>
                )}
              </Column>
              <Column key={'reserved'} width={96} align={'right'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Резерв'} />
                    <Cell render={({ row }) => <Inventory record={row} value={'reserved'} />} />
                  </>
                )}
              </Column>
              <Column key={'available'} width={96} align={'right'}>
                {({ Head, Cell }) => (
                  <>
                    <Head label={'Доступно'} />
                    <Cell render={({ row }) => <Inventory record={row} value={'available'} />} />
                  </>
                )}
              </Column>
              <Column key={'actions'} width={52}>
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
