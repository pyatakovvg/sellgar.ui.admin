import { Paragraph, Link } from '@library/kit';

import React from 'react';

import st from './default.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        <Paragraph>Интернет магазин "Sellgar" @2023</Paragraph>
      </div>
      <div className={st.author}>
        <Paragraph>
          Предоставлено компанией <Link href={'/'}>"Sellgar"</Link>
        </Paragraph>
      </div>
    </div>
  );
};
