import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { FormModify } from './FormModify';

import { context } from '@/root/product.context.ts';

import s from './default.module.scss';

export const Module = observer(() => {
  const params = useParams();
  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    try {
      presenter.getData(params.uuid);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleSubmit = (value: any) => {
    presenter.save(value);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Продукт</Heading>
      </div>
      <div className={s.content}>
        {presenter.isLoading ? (
          <p>Loading...</p>
        ) : presenter.isError ? (
          <p>Error</p>
        ) : (
          <FormModify product={presenter.product} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
});
