import React from 'react';
import * as App from '@sellgar/app/react';
import { Page } from '@library/design';
import { Button, Typography } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';
import { ProductFields } from '@library/product-form';

import { ProductReviewControllerInterface } from '../classes/controller/product-review/product-review-controller.interface.ts';
import { Variants } from './variants';
import s from './default.module.css';

const ModuleViewComponent: React.FC = () => {
  const product = App.useLoaderData(ProductReviewControllerInterface);
  const controller = App.useController(ProductReviewControllerInterface);

  return (
    <Page>
      <Page.Header>
        <Page.Header.Title>{product.name}</Page.Header.Title>
        <Page.Header.Controls>
          <Button style={'secondary'} onClick={() => void controller.edit(product.uuid)}>
            Редактировать
          </Button>
        </Page.Header.Controls>
      </Page.Header>
      <Page.Content>
        <div className={s.wrapper}>
          <div className={s.details}>
            <Typography size={'body-s'}>
              <p>Бренд: {product.brandCode}</p>
            </Typography>
            {product.description && (
              <Typography size={'body-s'}>
                <p>{product.description}</p>
              </Typography>
            )}
          </div>
          <div className={s.header}>
            <Typography size={'body-m'} weight={'medium'}>
              <h2>Варианты товара</h2>
            </Typography>
            <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={() => void controller.createVariant(product.uuid)}>
              Добавить вариант
            </Button>
          </div>
          <Variants />
          <Typography size={'body-m'} weight={'medium'}>
            <h2>Общие свойства товара</h2>
          </Typography>
          <ProductFields fields={product.properties} />
        </div>
      </Page.Content>
    </Page>
  );
};
export const ModuleView = App.reactive(ModuleViewComponent);
