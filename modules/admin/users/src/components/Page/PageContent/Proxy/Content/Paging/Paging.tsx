import { Paragraph } from '@library/kit';

import React from 'react';

import { useCount } from '@/hooks/useCount.ts';
import { useSearchParams } from '@/hooks/useSearchParams.ts';

import { Control } from './Control';

import s from './default.module.scss';

export const Paging: React.FC = () => {
  const count = useCount();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = async (page: number) => {
    const search = { ...searchParams, page };

    setSearchParams(search);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Paragraph>Всего: {count}</Paragraph>
      </div>
      <div className={s.control}>
        <Control
          page={searchParams.page ?? 1}
          take={import.meta.env.VITE_TAKE}
          total={count}
          onClick={handleChangePage}
        />
      </div>
    </div>
  );
};
