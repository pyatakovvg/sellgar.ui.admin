import React from 'react';
import { observer } from 'mobx-react';

import { context } from '../stock.context.ts';

import s from './default.module.scss';

export const StockView = observer(() => {
  const { controller } = React.useContext(context);

  React.useEffect(() => {
    controller.getData();
  }, []);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>Stock updated</div>
      <div className={s.content}></div>
    </div>
  );
});
