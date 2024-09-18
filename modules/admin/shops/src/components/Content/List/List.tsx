import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../../../shops.context';

import { Shop } from './Shop';

import s from './default.module.scss';
import { Paragraph } from '@library/kit';

export const List = observer(() => {
  const { presenter } = React.useContext(context);

  return (
    <div className={s.wrapper}>
      <div className={s.aside}>
        <Paragraph>Всего {presenter.shopsStore.getMeta().totalRows}</Paragraph>
      </div>
      <div className={s.list}>
        {presenter.shopsStore.getData().map((shop) => (
          <div key={shop.uuid} className={s.item}>
            <Shop {...shop} />
          </div>
        ))}
      </div>
    </div>
  );
});
