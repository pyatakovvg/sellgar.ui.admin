import React from 'react';

import { Aside } from './Aside';

import styles from './default.module.scss';

export const BaseLayout: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.aside}>
        <Aside />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};
