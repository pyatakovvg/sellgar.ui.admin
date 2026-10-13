import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit';
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
        <Table surface={'embedded'} size={'sm'} style={'secondary'} data={{ nodes: props.offer.records }}>
          {({ Column }) => (
            <>
              <Column width={220}>
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
                    <Head label={'Уточнения'} />
                    <Cell>
                      <Clarifications />
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
              <Column width={52}>
                {({ Cell }) => (
                  <Cell>
                    <Actions />
                  </Cell>
                )}
              </Column>
            </>
          )}
        </Table>
      </div>
    </RecordListContext.Provider>
  );
};
export const RecordList = App.reactive(RecordListComponent);
