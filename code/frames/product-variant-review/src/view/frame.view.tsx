import React from 'react';
import * as App from '@sellgar/app/react';
import { FrameLayout } from '@library/design';
import { ProductFields } from '@library/product-form';
import { Button, Drawer, Typography } from '@sellgar/kit';
import { VariantReviewControllerInterface } from '../classes/controller/variant-review/variant-review-controller.interface.ts';
import { Gallery } from './gallery';
import s from './default.module.css';

const FrameViewComponent: React.FC = () => {
  const data = App.useLoaderData(VariantReviewControllerInterface);
  const controller = App.useController(VariantReviewControllerInterface);
  const submit = App.useSubmit(VariantReviewControllerInterface);
  return (
    <FrameLayout>
      <FrameLayout.Header>
        <div className={s.header}>
          <Typography size={'body-m'} weight={'medium'}>
            Вариант товара
          </Typography>
          <Drawer.Close />
        </div>
      </FrameLayout.Header>
      <FrameLayout.Content>
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
      </FrameLayout.Content>
      <FrameLayout.Controls>
        <div className={s.controls}>
          <Button
            style={'secondary'}
            target={data.status === 'archived' ? 'default' : 'destructive'}
            inProcess={submit.inProcess}
            onClick={() => void submit(data)}
          >
            {data.status === 'archived' ? 'Восстановить' : 'Архивировать'}
          </Button>
          <Button disabled={submit.inProcess} onClick={() => void controller.edit(data.productUuid, data.uuid)}>
            Редактировать
          </Button>
        </div>
      </FrameLayout.Controls>
    </FrameLayout>
  );
};
export const FrameView = App.reactive(FrameViewComponent);
