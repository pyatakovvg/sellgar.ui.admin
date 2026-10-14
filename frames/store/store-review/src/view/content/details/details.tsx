import { InfoLine } from '@library/design';
import { useLoaderData, reactive } from '@sellgar/app/react';
import { Divider, Typography } from '@sellgar/kit';
import React from 'react';
import { StoreReviewControllerInterface } from '../../../classes/controller/store-review/store-review-controller.interface.ts';
import s from './default.module.scss';
const DetailsComponent: React.FC = () => {
  const data = useLoaderData(StoreReviewControllerInterface);
  return (
    <section className={s.wrapper}>
      <Divider type={'label-center'} label={'Сведения о товаре витрины'} />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Товар:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.productSnapshot?.name ?? 'Не синхронизирован'}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Магазин:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.shopSnapshot?.name ?? 'Не синхронизирован'}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Статус:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.status === 'active' ? 'Активный' : 'Архивный'}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>На витрине:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{data.showing ? 'Да' : 'Нет'}</p>
          </Typography>
        }
      />
    </section>
  );
};
export const Details = reactive(DetailsComponent);
