import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

import { FormModify } from './FormModify';

import { context } from '../product.context.ts';

import s from './default.module.scss';

export const ProductView = observer(() => {
  const params = useParams();
  const { controller } = React.useContext(context);

  React.useEffect(() => {
    controller.getData(params.uuid);
  }, []);

  const handleSubmit = (value: any) => {
    controller.save(value);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Продукт</Heading>
      </div>
      <div className={s.content}>
        {controller.isLoading ? (
          <p>Loading...</p>
        ) : controller.isError ? (
          <p>Error</p>
        ) : (
          <FormModify product={controller.product} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
});
