import React from 'react';
import { observer } from 'mobx-react';
import { Outlet } from 'react-router-dom';

import { Aside } from './Aside';

import styles from './default.module.scss';

export const ShopLayout: React.FC = observer(() => {
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
