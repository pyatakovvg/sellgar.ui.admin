import { Paragraph } from '@library/kit';

import React from 'react';

import { context } from '@/root/products.context';

import { Product } from './Product';

import s from './default.module.scss';

export const List: React.FC = () => {
  const { presenter } = React.useContext(context);

  return (
    <div className={s.wrapper}>
      <div className={s.filter}>
        <Paragraph>Всего {presenter.count}</Paragraph>
      </div>
      <div className={s.content}>
        {presenter.products.map((product) => (
          <div key={product.uuid} className={s.item}>
            <Product product={product} />
          </div>
        ))}
      </div>
      <div className={s.control}></div>
    </div>
  );
};
