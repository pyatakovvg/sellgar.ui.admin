import { Icon } from '@library/kit';

import React from 'react';

import { useSearchParams } from '@/hooks/useSearchParams.ts';

import { Number } from './Number';

import s from './default.module.scss';

interface IProps {
  page: number;
  take: number;
  total: number;
  onClick(page: number): void;
}

export const Control: React.FC<IProps> = (props) => {
  const totalPage = Math.ceil(props.total / props.take);
  const arrayNumbers = React.useMemo(() => new Array(totalPage).fill(null), [props]);

  const handleNextPage = () => {
    const nextPage = props.page + 1;

    if (nextPage > totalPage) {
      return void 0;
    }

    props.onClick(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = props.page - 1;

    if (prevPage < 1) {
      return void 0;
    }

    props.onClick(prevPage);
  };

  if (arrayNumbers.length <= 1) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.arrow} onClick={handlePrevPage}>
        <Icon icon={'chevron-left'} />
      </div>
      <div className={s.numbers}>
        {arrayNumbers.map((_, index) => {
          return (
            <div key={index} className={s.number}>
              <Number active={index === props.page - 1} number={index + 1} onClick={props.onClick} />
            </div>
          );
        })}
      </div>
      <div className={s.arrow} onClick={handleNextPage}>
        <Icon icon={'chevron-right'} />
      </div>
    </div>
  );
};
