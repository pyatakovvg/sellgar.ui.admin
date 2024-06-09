import React from 'react';
import { Outlet } from 'react-router-dom';

import { Aside } from './Aside';

import styles from './default.module.scss';

export const UserLayout: React.FC = () => {
  return (
    <div className={styles.wrapper} role={'users.layout'}>
      <div className={styles.aside}>
        <Aside />
      </div>
      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};
