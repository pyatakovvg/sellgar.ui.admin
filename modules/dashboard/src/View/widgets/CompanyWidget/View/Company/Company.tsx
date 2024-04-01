import { Heading, Link } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import { Shop } from './Shop';

import type { ICompany } from '../../company-widget.types.ts';

import s from './default.module.scss';

export const Company = observer((props: ICompany) => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'h2'}>Компания "{props.name}"</Heading>
      </div>
      <div className={s.content}>
        {props.shops.map((shop) => {
          return (
            <div key={shop.uuid} className={s.shop}>
              <Shop {...shop} />
            </div>
          );
        })}
      </div>
      <div className={s.control}>
        <Link href={'/shops/create'}>+ Добавить магазин</Link>
      </div>
    </div>
  );
});
