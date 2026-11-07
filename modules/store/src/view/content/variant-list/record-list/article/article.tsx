import type { StoreAccountingRecordEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  record: StoreAccountingRecordEntity;
}

const ArticleComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-s'} weight={'medium'}>
        <p className={s.name}>#{props.record.article ?? '---'}</p>
      </Typography>
    </div>
  );
};

export const Article = App.reactive(ArticleComponent);
