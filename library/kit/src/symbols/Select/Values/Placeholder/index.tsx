import React from 'react';

import st from './default.module.scss';

export const Placeholder = (props: React.PropsWithChildren) => {
  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        <span className={st.text}>{props.children}</span>
      </div>
    </div>
  );
};
