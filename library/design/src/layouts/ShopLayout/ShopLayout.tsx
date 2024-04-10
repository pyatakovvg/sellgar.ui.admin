import React from 'react';
import { Outlet } from 'react-router-dom';

import { Aside } from './Aside';

import styles from './default.module.scss';

export const ShopLayout: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <Aside />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
