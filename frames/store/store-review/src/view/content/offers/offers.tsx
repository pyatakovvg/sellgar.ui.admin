import { useLoaderData, reactive } from '@sellgar/app/react';
import { Divider } from '@sellgar/kit';
import React from 'react';
import { StoreReviewControllerInterface } from '../../../classes/controller/store-review/store-review-controller.interface.ts';
import { Offer } from './offer';
import s from './default.module.scss';
const OffersComponent: React.FC = () => {
  const data = useLoaderData(StoreReviewControllerInterface);
  return (
    <section className={s.wrapper}>
      <Divider type={'label-center'} label={'Варианты'} />
      {data.offers.map((offer) => (
        <Offer key={offer.uuid} offer={offer} />
      ))}
    </section>
  );
};
export const Offers = reactive(OffersComponent);
