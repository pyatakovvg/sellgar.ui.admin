import type { StoreAccountingRecordEntity, StoreOfferEntity } from '@library/domain';
import { reactive, useController } from '@sellgar/app/react';
import { Table, Typography } from '@sellgar/kit';
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
        data={{ nodes: props.offer.records }}
        row={{
          handlers: {
            click: ({ row }) => void controller.toInventory(props.offer.storeProductUuid, row.uuid),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column width={'minmax(0, 1fr)'}>
              {({ Head, Cell }) => (
                <>
                  <Head
                    label={
                      <Typography size={'caption-m'} weight={'regular'}>
                        <p className={s.heading}>Учетная запись</p>
                      </Typography>
                    }
                  />
                  <Cell>
                    <Entry />
                  </Cell>
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
                  <Cell>
                    <Quantity field={'quantity'} />
                  </Cell>
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
                  <Cell>
                    <Quantity field={'reserved'} />
                  </Cell>
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
                  <Cell>
                    <Quantity field={'available'} />
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
export const Records = reactive(RecordsComponent);
