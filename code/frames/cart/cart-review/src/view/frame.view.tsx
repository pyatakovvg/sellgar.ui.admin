import React from 'react';

import { useLoaderData } from '@sellgar/app/react';

import { CartReviewControllerInterface } from '../classes/controller/cart-review/cart-review-controller.interface.ts';
import { Details } from './details';
import { Items } from './items';
import { Missing } from './missing';
import { Total } from './total';

import s from './default.module.css';

export const FrameView: React.FC = () => {
  const cart = useLoaderData(CartReviewControllerInterface);

  if (cart === null) return <Missing />;

  return (
    <div className={s.wrapper}>
      <Details />
      <Items />
      <Total />
    </div>
  );
};
