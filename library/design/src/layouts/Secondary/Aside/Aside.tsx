import React from 'react';
import { NavLink } from 'react-router-dom';

import st from './default.module.scss';

export const Aside: React.FC = () => {
  return (
    <div className={st.wrapper}>
      <NavLink to={'/shops'}>Магазины</NavLink>
    </div>
  );
};
