import React from 'react';

import s from './default.module.scss';

export const Forbidden: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <h3>Что-то пошло не так!</h3>
      </div>
      <div className={s.message}>
        <h4>Доступ запрещен</h4>
      </div>
    </div>
  );
};
