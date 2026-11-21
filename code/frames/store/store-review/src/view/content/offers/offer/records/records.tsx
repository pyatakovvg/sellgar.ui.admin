import type { StoreAccountingRecordEntity, StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import { Table } from '@sellgar/kit/table';
import { Entry } from './entry';
import { Quantity } from './quantity';
import React from 'react';
import { StoreReviewControllerInterface } from '../../../../../classes/controller/store-review/store-review-controller.interface.ts';
import s from './default.module.css';
interface IProps {
  offer: StoreOfferEntity;
}
const RecordsComponent: React.FC<IProps> = (props) => {
  const controller = App.useController(StoreReviewControllerInterface);
  const revalidate = App.useRevalidate();

  return (
    <div className={s.wrapper}>
      <Table<StoreAccountingRecordEntity>
        loading={revalidate.inProcess}
        surface={'standalone'}
        size={'sm'}
        style={'secondary'}
        data={{ nodes: props.offer.records }}
        layout={{ scroll: 'external', virtualization: true, stickyHeader: false }}
        row={{
          handlers: {
            click: ({ row }) => void controller.toInventory(props.offer.storeProductUuid, row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column>
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
            <Column align={'right'}>
              {({ Head, Cell }) => (
                <>
                  <Head label={'Цена'} />
                  <Cell
                    render={({ row }) => (
                      <Typography size={'caption-m'} weight={'medium'}>
                        <span>
                          {row.currentPrice
                            ? `${row.currentPrice.value} ${row.currentPrice.currency.value}`
                            : 'Не указана'}
                        </span>
                      </Typography>
                    )}
                  />
                </>
              )}
            </Column>
            <Column width={64} align={'right'}>
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
            <Column width={64} align={'right'}>
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
            <Column width={64} align={'right'}>
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
export const Records = App.reactive(RecordsComponent);
