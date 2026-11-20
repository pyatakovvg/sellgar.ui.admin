import React from 'react';
import * as App from '@sellgar/app/react';
import { Table } from '@sellgar/kit/table';
import { Badge, Typography } from '@sellgar/kit';
import { ProductReviewControllerInterface } from '../../classes/controller/product-review/product-review-controller.interface.ts';

const VariantsComponent: React.FC = () => {
  const product = App.useLoaderData(ProductReviewControllerInterface);
  const controller = App.useController(ProductReviewControllerInterface);
  return (
    <Table
      data={{ nodes: product.variants }}
      row={{ handlers: { click: ({ row }) => void controller.openVariant(product.uuid, row.uuid) } }}
    >
      {({ Column }) => (
        <>
          <Column resizable={true}>
            {({ Head, Cell }) => (
              <>
                <Head label={'Вариант'} />
                <Cell render={({ row }) => <Typography size={'body-s'}>{row.name}</Typography>} />
              </>
            )}
          </Column>
          <Column width={160}>
            {({ Head, Cell }) => (
              <>
                <Head label={'Статус'} />
                <Cell render={({ row }) => <Badge label={row.status === 'archived' ? 'В архиве' : 'Активен'} />} />
              </>
            )}
          </Column>
          <Column width={160}>
            {({ Head, Cell }) => (
              <>
                <Head label={'Изображения'} />
                <Cell render={({ row }) => <Typography size={'body-s'}>{row.images.length}</Typography>} />
              </>
            )}
          </Column>
        </>
      )}
    </Table>
  );
};
export const Variants = App.reactive(VariantsComponent);
