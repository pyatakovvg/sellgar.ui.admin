import React from 'react';
import * as App from '@sellgar/app/react';
import type { LayoutViewProps } from '@sellgar/app/react';
import { FrameLayout } from '@library/design';
import { Button, Drawer, Typography } from '@sellgar/kit';
import { VariantModifyControllerInterface } from '../../../classes/controller/variant-modify/variant-modify-controller.interface.ts';
import s from './default.module.css';

const LayoutViewComponent: React.FC<LayoutViewProps> = (props) => {
  const data = App.useLoaderData(VariantModifyControllerInterface);
  const submit = App.useSubmit(VariantModifyControllerInterface);

  return (
    <FrameLayout>
      <FrameLayout.Header>
        <div className={s.header}>
          <Typography size={'body-m'} weight={'medium'}>
            {data.variant ? 'Редактирование варианта' : 'Новый вариант'}
          </Typography>
          <Drawer.Close />
        </div>
      </FrameLayout.Header>
      <FrameLayout.Content>{props.children}</FrameLayout.Content>
      <FrameLayout.Controls>
        <div className={s.controls}>
          <Button type={'submit'} form={'variant-form'} inProcess={submit.inProcess} disabled={submit.inProcess}>
            Сохранить
          </Button>
        </div>
      </FrameLayout.Controls>
    </FrameLayout>
  );
};
export const LayoutView = App.reactive(LayoutViewComponent);
