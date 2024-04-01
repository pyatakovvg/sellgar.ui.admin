import { Heading, Paragraph } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../products.context.ts';
import { Product, type IProduct } from './Product';

import s from './default.module.scss';

export const ProductView = observer(() => {
  const { controller } = React.useContext(context);

  React.useEffect(() => {
    (async () => controller.getData())();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Продукты</Heading>
      </div>
      <div className={s.content}>
        <div className={s.aside}>
          <Paragraph>Всего {controller.products.meta.totalRows}</Paragraph>
        </div>
        <div className={s.list}>
          {controller.products.data.map((product: IProduct) => (
            <div key={product.uuid} className={s.item}>
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
