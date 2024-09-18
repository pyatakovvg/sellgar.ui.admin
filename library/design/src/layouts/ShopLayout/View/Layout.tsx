import { useChangeBreadcrumb } from '@library/breadcrumbs';

import React from 'react';
import { observer } from 'mobx-react';
import { useParams, Outlet } from 'react-router-dom';

import { Aside } from './Aside';

import { context } from '../shop-layout.context';
import { useShop } from '../hooks/useShop.ts';
import styles from './default.module.scss';

export const Layout: React.FC = observer(() => {
  const { presenter } = React.useContext(context);
  const { uuid } = useParams();
  const shop = useShop();

  const changeBreadcrumb = useChangeBreadcrumb();

  React.useEffect(() => {
    if (uuid) {
      presenter.getData(uuid);
    }
  }, []);

  React.useEffect(() => {
    if (shop) {
      changeBreadcrumb('SHOP_INFORMATION', shop.name);
    }
  }, [shop]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <Aside />
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
});
