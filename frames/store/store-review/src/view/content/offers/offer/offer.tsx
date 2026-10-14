import type { StoreOfferEntity } from '@library/domain';
import { InfoLine } from '@library/design';
import { reactive } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';
import React from 'react';
import { Records } from './records';
import s from './default.module.scss';
interface IProps {
  offer: StoreOfferEntity;
}
const OfferComponent: React.FC<IProps> = (props) => {
  const price = props.offer.currentPrice;
  return (
    <section className={s.wrapper}>
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Вариант:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{props.offer.variantSnapshot?.name ?? 'Не синхронизирован'}</p>
          </Typography>
        }
      />
      <InfoLine
        label={
          <Typography size={'caption-m'} weight={'semi-bold'}>
            <p className={s.label}>Цена:</p>
          </Typography>
        }
        value={
          <Typography size={'caption-m'} weight={'regular'}>
            <p className={s.value}>{price ? `${price.value} ${price.currency.value}` : 'Не указана'}</p>
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
            <p className={s.value}>{props.offer.showing ? 'Да' : 'Нет'}</p>
          </Typography>
        }
      />
      <Records offer={props.offer} />
    </section>
  );
};
export const Offer = reactive(OfferComponent);
