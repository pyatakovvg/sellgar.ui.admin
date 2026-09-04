import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import * as Kit from '@sellgar/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

const ArticleComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreOfferEntity>();

  return (
    <div className={s.wrapper}>
      <Typography size={'caption-s'} weight={'medium'}>
        <p className={s.name}>#{data.article ?? '---'}</p>
      </Typography>
    </div>
  );
};

export const Article = App.reactive(ArticleComponent);
