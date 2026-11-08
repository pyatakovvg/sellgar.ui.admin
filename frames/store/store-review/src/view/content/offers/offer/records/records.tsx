import type { StoreAccountingRecordEntity, StoreOfferEntity } from '@library/domain';
import { reactive, useController } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import { Table } from '@sellgar/kit/table';
import { Entry } from './entry';
import { Quantity } from './quantity';
import React from 'react';
import { StoreReviewControllerInterface } from '../../../../../classes/controller/store-review/store-review-controller.interface.ts';
import s from './default.module.scss';
interface IProps {
  offer: StoreOfferEntity;
}
const RecordsComponent: React.FC<IProps> = (props) => {
  const controller = useController(StoreReviewControllerInterface);
  return (
    <div className={s.wrapper}>
      <Table<StoreAccountingRecordEntity>
        surface={'standalone'}
        size={'sm'}
        style={'secondary'}
        data={{ nodes: props.offer.records, getRowId: (row) => row.uuid }}
        layout={{ scroll: 'external', virtualization: true, stickyHeader: false }}
        row={{
          handlers: {
            click: ({ row }) => void controller.toInventory(props.offer.storeProductUuid, row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column key={'entry'}>
              {({ Head, Cell }) => (
                <>
                  <Head
                    label={
                      <Typography size={'caption-m'} weight={'regular'}>
                        <p className={s.heading}>Учетная запись</p>
                      </Typography>
                    }
                  />
                  <Cell render={({ row }) => <Entry record={row} />} />
                </>
              )}
            </Column>
            <Column key={'quantity'} width={64} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head
                    label={
                      <Typography size={'caption-m'} weight={'regular'}>
                        <abbr className={s.heading} title={'Остаток'}>
                          Ост.
                        </abbr>
                      </Typography>
                    }
                  />
                  <Cell render={({ row }) => <Quantity record={row} field={'quantity'} />} />
                </>
              )}
            </Column>
            <Column key={'reserved'} width={64} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head
                    label={
                      <Typography size={'caption-m'} weight={'regular'}>
                        <abbr className={s.heading} title={'Резерв'}>
                          Рез.
                        </abbr>
                      </Typography>
                    }
                  />
                  <Cell render={({ row }) => <Quantity record={row} field={'reserved'} />} />
                </>
              )}
            </Column>
            <Column key={'available'} width={64} align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head
                    label={
                      <Typography size={'caption-m'} weight={'regular'}>
                        <abbr className={s.heading} title={'Доступно'}>
                          Дост.
                        </abbr>
                      </Typography>
                    }
                  />
                  <Cell render={({ row }) => <Quantity record={row} field={'available'} />} />
                </>
              )}
            </Column>
          </>
        )}
      </Table>
    </div>
  );
};
export const Records = reactive(RecordsComponent);
