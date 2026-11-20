import React from 'react';
import * as App from '@sellgar/app/react';
import { ProductFields } from '@library/product-form';
import { Typography } from '@sellgar/kit';
import { VariantReviewControllerInterface } from '../classes/controller/variant-review/variant-review-controller.interface.ts';
import { Gallery } from './gallery';
import s from './default.module.css';

const FrameViewComponent: React.FC = () => {
  const data = App.useLoaderData(VariantReviewControllerInterface);
  return (
    <div className={s.wrapper}>
      <Typography size={'body-m'} weight={'medium'}>
        <h2>{data.name}</h2>
      </Typography>
      <Typography size={'caption-m'}>{data.status === 'archived' ? 'В архиве' : 'Активен'}</Typography>
      <Gallery />
      <ProductFields fields={data.properties} />
      {data.description && (
        <Typography size={'body-s'}>
          <p>{data.description}</p>
        </Typography>
      )}
    </div>
  );
};
export const FrameView = App.reactive(FrameViewComponent);
