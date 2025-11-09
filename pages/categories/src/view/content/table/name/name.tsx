import { Typography } from '@sellgar/kit';
import { cellContext, Expand } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC = () => {
  const { deps, data } = React.use(cellContext);

  return (
    <div className={s.wrapper} style={{ marginLeft: 20 * deps }}>
      <div className={s.expand}>
        <Expand />
      </div>
      <div className={s.content}>
        <Typography size={'caption-l'} weight={'semi-bold'}>
          <p className={s.text}>{data}</p>
        </Typography>
      </div>
    </div>
  );
};
