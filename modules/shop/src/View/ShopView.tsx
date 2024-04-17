import { Heading } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams, useNavigate, useBlocker } from 'react-router-dom';

import { context } from '../shop.context.ts';

import { FormModify } from './FormModify';

import type { IShop } from '../shop.types.ts';

import s from './default.module.scss';

export const ShopView = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const { presenter } = React.useContext(context);

  React.useEffect(() => {
    (async () => {
      await presenter.getCompany();
      if (params.uuid) {
        await presenter.getData(params.uuid);
      }
    })();
  }, []);

  const handleSubmit = async (value: IShop) => {
    await presenter.save(value);
    if (!value.uuid) {
      navigate('/shops/' + presenter.shop.uuid);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Магазин</Heading>
      </div>
      <div className={s.content}>
        <FormModify shop={presenter.shop} onSubmit={handleSubmit} />
      </div>
    </div>
  );
});
