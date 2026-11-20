import React from 'react';
import * as App from '@sellgar/app/react';
import type { LayoutViewProps } from '@sellgar/app/react';
import { FrameLayout } from '@library/design';
import { Button, Drawer, Typography } from '@sellgar/kit';
import { VariantReviewControllerInterface } from '../../../classes/controller/variant-review/variant-review-controller.interface.ts';
import s from './default.module.css';

const LayoutViewComponent: React.FC<LayoutViewProps> = (props) => {
  const data = App.useLoaderData(VariantReviewControllerInterface);
  const submit = App.useSubmit(VariantReviewControllerInterface);
  const controller = App.useController(VariantReviewControllerInterface);

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
      <FrameLayout.Content>{props.children}</FrameLayout.Content>
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
export const LayoutView = App.reactive(LayoutViewComponent);
